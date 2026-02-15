export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
// don't use next/headers here; build a request-scoped cookies wrapper below

export async function GET(request: NextRequest) {
  try {
    // Parse cookie header once and build a small sync cookies wrapper
    const cookieHeader = request.headers.get("cookie") || "";
    const parsedPairs = cookieHeader
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((pair) => {
        const idx = pair.indexOf("=");
        const name = idx === -1 ? pair : pair.slice(0, idx);
        const value = idx === -1 ? "" : pair.slice(idx + 1);
        return { name, value: decodeURIComponent(value) };
      });

    const cookiesWrapper = {
      get: (name: string) => {
        const found = parsedPairs.find((p) => p.name === name);
        return found ? { value: found.value } : undefined;
      },
      getAll: () => parsedPairs.map((p) => ({ name: p.name, value: p.value })),
      set: () => {},
      delete: () => {},
    };

    const supabase = createRouteHandlerClient({
      cookies: () => cookiesWrapper as any,
    });
    // 1. Get Supabase session for the current user
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get the URL to render
    let url = request.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.json(
        { error: "Missing url parameter" },
        { status: 400 },
      );
    }

    // If a developer passed a localhost URL while running on Vercel, rewrite it
    // to the deployed URL (VERCEL_URL) so the server process can reach it.
    try {
      const parsed = new URL(url);
      const isLocalhost = ["localhost", "127.0.0.1", "0.0.0.0"].includes(
        parsed.hostname,
      );
      if (isLocalhost) {
        const vercelHost = "skill-fresher.vercel.app";
        if (vercelHost) {
          parsed.hostname = vercelHost;
          // enforce https in production on Vercel
          parsed.protocol = "https:";
          url = parsed.toString();
        } else {
          // In production, a localhost target is not reachable from Vercel
          return NextResponse.json(
            {
              error:
                "URL points to localhost which is not reachable from production server",
            },
            { status: 400 },
          );
        }
      }
    } catch (e) {
      // ignore invalid URL here; later navigation will fail with clearer message
    }

    // 3. Build Puppeteer cookie objects from parsed pairs
    const cookies = parsedPairs
      .map((p) => ({ name: p.name, value: p.value, path: "/" }))
      .filter((c) => c.name && c.value);

    // 4. Launch Puppeteer and set cookies (use puppeteer-core + @sparticuz/chromium on Vercel)
    const launchOptions: any = {
      headless: true,
      args: chromium.args,
      defaultViewport: { width: 1280, height: 720 },
    };

    let browser: any;
    try {
      browser = await puppeteer.launch(launchOptions);
    } catch (err: any) {
      console.error("Puppeteer launch failed:", err?.message || err);
      // Try connecting to a remote browser service if provided (Browserless, etc.)
      const remoteEndpoint =
        process.env.BROWSERLESS_WS_ENDPOINT || process.env.BROWSERLESS_URL;
      if (remoteEndpoint) {
        try {
          browser = await puppeteer.connect({
            browserWSEndpoint: remoteEndpoint,
          });
          console.info("Connected to remote browser endpoint");
        } catch (connectErr: any) {
          console.error(
            "Failed to connect to remote browser:",
            connectErr?.message || connectErr,
          );
          return NextResponse.json(
            {
              error: "Browser launch and remote connect both failed",
              launchError: String(err?.message || err),
              connectError: String(connectErr?.message || connectErr),
            },
            { status: 500 },
          );
        }
      } else {
        // No remote fallback configured — return detailed error to help debugging
        return NextResponse.json(
          {
            error:
              "Chromium not found or failed to launch. On Vercel use @sparticuz/chromium with puppeteer-core, set PUPPETEER_EXECUTABLE_PATH, or configure a remote browser.",
            detail: String(err?.message || err),
          },
          { status: 500 },
        );
      }
    }
    const page = await browser.newPage();
    if (cookies.length > 0) {
      try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;
        const normalized = cookies.map((c) => ({ ...c, domain: hostname }));
        await page.setCookie(...normalized);
      } catch (err) {
        console.warn("Could not set cookies for Puppeteer page:", err);
      }
    }

    // 5. Go to the preview page as the authenticated user
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    // 6. Generate the PDF
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    // 7. Return the PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

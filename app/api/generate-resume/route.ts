import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import puppeteer from "puppeteer";
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
    const url = request.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.json(
        { error: "Missing url parameter" },
        { status: 400 },
      );
    }

    // 3. Build Puppeteer cookie objects from parsed pairs
    const cookies = parsedPairs
      .map((p) => ({ name: p.name, value: p.value, path: "/" }))
      .filter((c) => c.name && c.value);

    // 4. Launch Puppeteer and set cookies
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
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

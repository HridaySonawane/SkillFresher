export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function GET(request: NextRequest) {
  try {
    /* =========================================================
       1️⃣ Parse Cookies From Request
    ========================================================== */

    const cookieHeader = request.headers.get("cookie") || "";

    const parsedCookies = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((pair) => {
        const index = pair.indexOf("=");
        const name = pair.substring(0, index);
        const value = pair.substring(index + 1);
        return { name, value: decodeURIComponent(value) };
      });

    const cookiesWrapper = {
      get: (name: string) => {
        const found = parsedCookies.find((c) => c.name === name);
        return found ? { value: found.value } : undefined;
      },
      getAll: () => parsedCookies,
      set: () => {},
      delete: () => {},
    };

    const supabase = createRouteHandlerClient({
      cookies: () => cookiesWrapper as any,
    });

    /* =========================================================
       2️⃣ Verify Supabase Session
    ========================================================== */

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* =========================================================
       3️⃣ Get Target URL
    ========================================================== */

    let url = request.nextUrl.searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "Missing url parameter" },
        { status: 400 },
      );
    }

    // Replace localhost with production domain if needed
    const parsedUrl = new URL(url);

    if (["localhost", "127.0.0.1", "0.0.0.0"].includes(parsedUrl.hostname)) {
      parsedUrl.hostname = request.headers.get("host")!;
      parsedUrl.protocol = "https:";
      url = parsedUrl.toString();
    }

    /* =========================================================
       4️⃣ Launch Puppeteer (Correct Production Setup)
    ========================================================== */

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1280, height: 720 },

      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();

    /* =========================================================
       5️⃣ Set Cookies In Browser Context
    ========================================================== */

    if (parsedCookies.length > 0) {
      const hostname = new URL(url).hostname;

      await page.setCookie(
        ...parsedCookies.map((c) => ({
          name: c.name,
          value: c.value,
          domain: hostname,
          path: "/",
        })),
      );
    }

    /* =========================================================
       6️⃣ Navigate & Generate PDF
    ========================================================== */

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    /* =========================================================
       7️⃣ Return PDF
    ========================================================== */

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Resume Builder",
  description: "Create professional resumes with AI assistance",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#f0eeeb] dark:bg-gray-950`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <ClientOnly> */}
          <AuthProvider>
            {/* <div className="fixed z-[100] top-4 left-4">
							<ModeToggle />
						</div> */}
            {children}
          </AuthProvider>
          {/* </ClientOnly> */}
        </ThemeProvider>
      </body>
    </html>
  );
}

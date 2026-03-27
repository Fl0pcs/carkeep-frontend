import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarKeep",
  description: "Smart car maintenance history and reminders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-900">
        <div className="min-h-screen">
          {children}
        </div>

        <footer className="border-t border-slate-200 bg-white/90 px-6 py-6 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-base font-semibold tracking-tight text-slate-900">
                CarKeep
              </div>
              <div className="text-sm text-slate-500">
                Smart car maintenance history and reminders
              </div>
            </div>
            
            <div className="text-xs text-slate-400">
  © {new Date().getFullYear()} CarKeep. All rights reserved.
</div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <Link href="/privacy" className="transition hover:text-slate-900 hover:underline">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-slate-900 hover:underline">
                Terms
              </Link>
              <Link href="/contact" className="transition hover:text-slate-900 hover:underline">
                Contact
              </Link>
            </div>
          </div>
          
        </footer>
      </body>
    </html>
  );
}
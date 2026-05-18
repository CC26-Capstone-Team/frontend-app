import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-providers";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/shared/Header";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarPathMu",
  description: "Sistem Rekomendasi Jalur Karir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          {/* Header dipanggil di sini */}
          <Header />

            <div className="flex gap-2.5">
              <Button
                variant={"outline"}
                className="cursor-pointer border border-indigo-600 px-4 py-4 text-sm font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white"
                asChild
              >
                <Link href="/login">Masuk</Link>
              </Button>
              <Button
                className="cursor-pointer border border-indigo-600 bg-indigo-600 px-4 py-4 text-sm font-semibold hover:bg-indigo-800"
                asChild
              >
                <Link href="/register">Daftar</Link>
              </Button>
            </div>
          </header>

          <main>{children}</main>
          <main className="flex-1">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}

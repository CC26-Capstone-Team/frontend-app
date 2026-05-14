import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-providers";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";

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
          {/* PERUBAHAN DI SINI:
        1. sticky top-0 z-50 -> Membuat header menempel di atas dan tidak tertimpa animasi
        2. bg-white/80 backdrop-blur-md -> Efek kaca buram transparan
        3. border-b border-slate-200/60 -> Garis batas bawah yang sangat halus sebagai pengganti shadow keras 
      */}
          <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 py-4 backdrop-blur-md">
            <h1 className="font-heading text-xl font-extrabold">
              <span className="text-indigo-600">CarPath</span>
              <span className="text-[#0f9488]">Mu</span>
            </h1>

            <Navbar />

            <div className="flex gap-2.5">
              <Button
                variant={"outline"}
                className="cursor-pointer border-indigo-600 px-5 py-4 text-sm font-semibold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white"
              >
                Masuk
              </Button>
              <Button className="cursor-pointer border-indigo-600 bg-indigo-600 px-5 py-4 text-sm font-semibold text-white transition-all hover:bg-indigo-700">
                Daftar
              </Button>
            </div>
          </header>

          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}

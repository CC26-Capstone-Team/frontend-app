import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-providers";
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

          <main className="flex-1">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}

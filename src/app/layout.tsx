import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-providers";
import { AuthProvider } from "@/providers/auth-provider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CarPathMu",
    template: "%s | CarPathMu",
  },
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
      <body suppressHydrationWarning>
        <QueryProvider>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

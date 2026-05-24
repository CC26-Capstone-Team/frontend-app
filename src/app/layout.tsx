import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-providers";
import { AuthProvider } from "@/providers/auth-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";

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
  const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID || "";

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${syne.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning>
        <QueryProvider>
          <AuthProvider>
            <GoogleOAuthProvider clientId={clientId}>
              <main>{children}</main>
            </GoogleOAuthProvider>
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

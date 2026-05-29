import type { Metadata } from "next";
import LoginPageClient from "@/features/auth/components/LoginPageClient"; // Sesuaikan path ini dengan struktur folder Anda

export const metadata: Metadata = {
  title: "Masuk Akun | CarPathMu",
  description:
    "Masuk ke akun CarPathMu Anda untuk melanjutkan pencarian jalur karir impian Anda.",
};

export default function LoginPage() {
  return <LoginPageClient />;
}
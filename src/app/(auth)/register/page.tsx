import type { Metadata } from "next";
import RegisterPageClient from "@/features/auth/components/RegisterPageClient";

export const metadata: Metadata = {
  title: "Daftar Akun | CarPathMu",
  description:
    "Daftarkan diri Anda di CarPathMu untuk menganalisis potensi, mendapatkan rekomendasi kursus, dan merencanakan masa depan karir yang tepat berbasis data AI.",
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}

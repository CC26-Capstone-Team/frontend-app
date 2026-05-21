import DashboardClientPage from "@/features/dashboard/components/DashboardClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default function Dashboard() {
  return (
    /*
     * Background blob decorations ditempatkan di sini agar bisa
     * di-reuse di seluruh layout dashboard jika diperlukan.
     * Gunakan bg-indigo-50 sebagai page background (sama dengan HeroSection).
     */
    <DashboardClientPage />
  );
}

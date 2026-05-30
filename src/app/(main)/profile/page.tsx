import ProfileClientPage from "@/features/profile/components/ProfileClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Saya | CarPathMu",
  description: "Kelola informasi profil akademik dan keahlian Anda di CarPathMu.",
};

export default function ProfilePage() {
  return <ProfileClientPage />;
}

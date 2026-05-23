import CareerRecommendationsClientPage from "@/features/career-recommendations/components/CareerRecommendationsClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Rekomendasi Karir" };

export default function CareerRecommendationsPage() {
  return <CareerRecommendationsClientPage />;
}

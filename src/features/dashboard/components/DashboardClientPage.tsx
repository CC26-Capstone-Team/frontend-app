"use client";

import { useAuth } from "@/providers/auth-provider";
import GreetingSection from "./GreetingSection";
import RecommendationSection from "./RecommendationSection";
import StatsSection from "./StatsSection";
import { useRecommendation } from "../hooks/use-dashboard";

export default function DashboardClientPage() {
  const { user } = useAuth();
  const { data: recommendation, isLoading } = useRecommendation();

  return (
    // Background dan blobs sudah dihapus, cukup merender konten
    <section className="w-full space-y-8">
      {user && <GreetingSection user={user} />}
      <StatsSection recommendation={recommendation ?? []} />
      <RecommendationSection recommendation={recommendation ?? []} isLoading={isLoading} />
    </section>
  );
}
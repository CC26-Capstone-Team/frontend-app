"use client";

import { useAuth } from "@/providers/auth-provider";
import GreetingSection from "./GreetingSection";
import RecommendationSection from "./RecommendationSection";
import StatsSection from "./StatsSection";
import { useRecommendation } from "../hooks/use-dashboard";
import { useState } from "react";
import ReanalyzeModal from "./reanalyze/ReanalyzeModal";

export default function DashboardClientPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const { data: recommendation, isLoading, refetch } = useRecommendation();

  return (
    // Background dan blobs sudah dihapus, cukup merender konten
    <section className="w-full space-y-8">
      {user && (
        <GreetingSection user={user} onReanalyze={() => setIsModalOpen(true)} />
      )}
      <StatsSection recommendation={recommendation ?? []} />
      <RecommendationSection
        recommendation={recommendation ?? []}
        isLoading={isLoading}
      />
      <ReanalyzeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          refetch();
        }}
      />
    </section>
  );
}

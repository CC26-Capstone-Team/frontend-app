import { StatsSectionProps } from "../types/dashboard.types";
import StatsCard from "./StatsCard";
import { Compass, Target, TrendingUp } from "lucide-react";


export default function StatsSection({ recommendation = [] }: StatsSectionProps) {
  const topMatch = recommendation.reduce(
    (best, rec) =>
      parseFloat(rec.match_score) > parseFloat(best?.match_score ?? "0") ? rec : best,
    recommendation[0]
  );

  const topMatchScore = topMatch ? Math.round(parseFloat(topMatch.match_score) * 100) : 0;
  const topMatchTitle = topMatch?.career.title ?? "-";

  const statsData = [
    {
      title: "Jalur karir ditemukan",
      value: recommendation.length,
      description: "Berdasarkan profilmu",
      icon: Compass,
      variant: "indigo" as const,
    },
    {
      title: "Kecocokan tertinggi",
      value: topMatchScore,
      unit: "%",
      description: topMatchTitle,
      icon: Target,
      variant: "emerald" as const,
    },
    {
      title: "Peluang kerja",
      value: 97,
      unit: "%",
      description: "Berdasarkan tren pasar",
      icon: TrendingUp,
      variant: "fuchsia" as const,
    },
  ];

  return (
    // Mengubah gap menjadi lebih kecil di layar mobile (gap-3) dan kembali normal (gap-4) di atasnya
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {statsData.map((data, index) => (
        <StatsCard
          key={index}
          title={data.title}
          value={data.value}
          description={data.description}
          icon={data.icon}
          unit={data.unit}
          variant={data.variant}
        />
      ))}
    </div>
  );
}
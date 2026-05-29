"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { RecommendationCardProps } from "../types/dashboard.types";

function getMatchStyle(rank: number) {
  if (rank === 1) {
    return {
      value: "text-indigo-600",
      bar: "from-indigo-500 to-indigo-400",
      iconBg: "bg-indigo-100/80",
    };
  }
  if (rank === 2) {
    return {
      value: "text-emerald-600",
      bar: "from-emerald-500 to-emerald-400",
      iconBg: "bg-emerald-100/80",
    };
  }
  return {
    value: "text-fuchsia-600",
    bar: "from-fuchsia-500 to-fuchsia-400",
    iconBg: "bg-fuchsia-100/80",
  };
}

export default function RecommendationCard({
  title,
  match,
  subtitle,
  icon: Icon,
  skills = [],
  isTopMatch = false,
  rank = 4,
}: RecommendationCardProps) {
  const styles = getMatchStyle(rank);

  return (
    <div
      className={cn(
        "group relative rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
        isTopMatch
          ? "p-0.5 shadow-fuchsia-200/50" // Padding sedikit lebih besar untuk ruang border
          : "border border-white/80 bg-white/60 shadow-sm shadow-indigo-100/30 hover:bg-white/75 hover:shadow-indigo-200/40"
      )}
    >
      {/* === ANIMATED GRADIENT BORDER (Hanya muncul jika isTopMatch) === */}
      {isTopMatch && (
        <motion.div
          className="absolute inset-0 z-0 rounded-2xl bg-linear-to-r from-fuchsia-500 via-purple-500 to-emerald-500"
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{
            duration: 4, // Kecepatan aliran gradasi
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 200%" }} // Diperlukan untuk efek flow
        />
      )}

      {/* === INNER CONTENT WRAPPER === */}
      <div
        className={cn(
          "relative z-10 flex items-center gap-4 rounded-[calc(1rem-1px)] px-5 py-4",
          isTopMatch ? "bg-white/90 backdrop-blur-xl" : "" // Sedikit lebih pekat agar teks jelas
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            styles.iconBg
          )}
        >
          <Icon className={cn("h-5 w-5", styles.value)} />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-bold text-slate-900">{title}</p>
            {isTopMatch && (
              <span className="shrink-0 rounded-full bg-linear-to-r from-fuchsia-500 via-purple-500 to-emerald-500 px-2 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase shadow-sm">
                Top Match
              </span>
            )}
          </div>

          {subtitle && (
            <p className="mt-0.5 truncate text-xs text-slate-400">{subtitle}</p>
          )}

          {/* Skills List */}
          {skills.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={cn(
                    "rounded-md border border-slate-200/60 bg-slate-100/80 px-2 py-0.5 text-[10px] font-medium text-slate-500",
                    // Tampilkan maksimal 3 di mobile. Index 3 ke atas (skill ke-4 dst)
                    // disembunyikan di mobile, tapi ditampilkan di layar sm ke atas.
                    index >= 3 ? "hidden sm:inline-block" : "inline-block"
                  )}
                >
                  {skill}
                </span>
              ))}

              {/* Indikator +X */}
              {/* Hanya tampil di mobile (disembunyikan di layar sm ke atas) */}
              {skills.length > 3 && (
                <span className="inline-block rounded-md border border-slate-300/60 bg-slate-200/80 px-2 py-0.5 text-[10px] font-bold text-slate-600 sm:hidden">
                  +{skills.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Progress bar */}
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn("h-full rounded-full bg-linear-to-r", styles.bar)}
              style={{ width: `${match}%` }}
            />
          </div>
        </div>

        {/* Match score */}
        <div className="shrink-0 text-right">
          <p
            className={cn("text-xl leading-none font-extrabold", styles.value)}
          >
            {match}%
          </p>
          <p className="mt-1 text-[10px] font-medium text-slate-400">
            kecocokan
          </p>
        </div>
      </div>
    </div>
  );
}

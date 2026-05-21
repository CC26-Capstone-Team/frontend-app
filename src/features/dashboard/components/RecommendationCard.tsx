"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface RecommendationCardProps {
  title: string;
  match: number;
  subtitle?: string;
  icon: LucideIcon;
  skills?: string[];
  isTopMatch?: boolean;
}

function getMatchStyle(match: number) {
  if (match >= 85) {
    return {
      value: "text-indigo-600",
      bar: "from-indigo-500 to-indigo-400",
      iconBg: "bg-indigo-100/80",
    };
  }
  if (match >= 70) {
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
}: RecommendationCardProps) {
  const styles = getMatchStyle(match);

  return (
    <div
      className={cn(
        "group relative rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
        isTopMatch
          ? "p-[2px] shadow-fuchsia-200/50" // Padding sedikit lebih besar untuk ruang border
          : "border border-white/80 bg-white/60 shadow-sm shadow-indigo-100/30 hover:bg-white/75 hover:shadow-indigo-200/40"
      )}
    >
      {/* === ANIMATED GRADIENT BORDER (Hanya muncul jika isTopMatch) === */}
      {isTopMatch && (
        <motion.div
          className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-500"
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
              <span className="shrink-0 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-500 px-2 py-0.5 text-[9px] font-bold tracking-wide text-white shadow-sm uppercase">
                Top Match
              </span>
            )}
          </div>

          {subtitle && (
            <p className="mt-0.5 truncate text-xs text-slate-400">{subtitle}</p>
          )}

          {/* Dummy Skills */}
          {skills.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-md border border-slate-200/60 bg-slate-100/80 px-2 py-0.5 text-[10px] font-medium text-slate-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Progress bar */}
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn("h-full rounded-full bg-gradient-to-r", styles.bar)}
              style={{ width: `${match}%` }}
            />
          </div>
        </div>

        {/* Match score */}
        <div className="shrink-0 text-right">
          <p
            className={cn("text-xl font-extrabold leading-none", styles.value)}
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
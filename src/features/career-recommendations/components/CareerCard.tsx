"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code2,
  Server,
  Database,
  BrainCircuit,
  Shield,
  Palette,
  FlaskConical,
  TrendingUp,
  Users,
  Briefcase,
  Megaphone,
  Target,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MatchScoreRing from "./MatchScoreRing";
import type {
  RecommendationHistory,
  Skill,
} from "../types/career-recommendations.types";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  "Software Development": Code2,
  "Infrastructure & Operations": Server,
  "Data & Analytics": Database,
  "Artificial Intelligence": BrainCircuit,
  Cybersecurity: Shield,
  "Design & Creative": Palette,
  "Research & Development": FlaskConical,
  "Finance & Accounting": TrendingUp,
  "Human Resources": Users,
  "Business & Management": Briefcase,
  "Marketing & Communications": Megaphone,
  "Product & Strategy": Target,
};

const INDUSTRY_COLORS: Record<string, string> = {
  "Software Development": "from-indigo-500 to-blue-500",
  "Infrastructure & Operations": "from-sky-500 to-cyan-500",
  "Data & Analytics": "from-emerald-500 to-teal-500",
  "Artificial Intelligence": "from-purple-500 to-violet-500",
  Cybersecurity: "from-red-500 to-rose-500",
  "Design & Creative": "from-pink-500 to-fuchsia-500",
  "Research & Development": "from-amber-500 to-orange-500",
  "Finance & Accounting": "from-green-500 to-emerald-500",
  "Human Resources": "from-blue-500 to-indigo-500",
  "Business & Management": "from-slate-500 to-gray-500",
  "Marketing & Communications": "from-orange-500 to-amber-500",
  "Product & Strategy": "from-violet-500 to-purple-500",
};

interface CareerCardProps {
  recommendation: RecommendationHistory;
  index: number;
  isTopMatch: boolean;
  skills: Skill[];
}

export default function CareerCard({
  recommendation,
  index,
  isTopMatch,
  skills,
}: CareerCardProps) {
  const { career, match_score } = recommendation;
  const score = Math.round(parseFloat(match_score));
  const industry = career.industry ?? "Lainnya";
  const Icon = INDUSTRY_ICONS[industry] ?? Sparkles;
  const gradient = INDUSTRY_COLORS[industry] ?? "from-slate-500 to-gray-500";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay: index * 0.06 },
        },
      }}
    >
      <Link href={`/career-recommendations/${career.id}`}>
        <div
          className={cn(
            "group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
            isTopMatch
              ? "border-indigo-200/60 bg-white/80 shadow-lg shadow-indigo-100/50"
              : "border-white/80 bg-white/60 shadow-sm hover:bg-white/75 hover:shadow-indigo-100/30"
          )}
        >
          {/* Top Match Badge */}
          {isTopMatch && (
            <div className="absolute top-0 right-0 z-10">
              <div className="rounded-bl-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-3 py-1">
                <span className="text-[10px] font-bold tracking-wider text-white uppercase">
                  ⭐ Top Match
                </span>
              </div>
            </div>
          )}

          {/* Gradient accent line */}
          <div className={cn("h-1 w-full bg-gradient-to-r", gradient)} />

          <div className="p-5">
            {/* Header: Icon + Info + Score Ring */}
            <div className="flex items-start gap-4">
              {/* Industry Icon */}
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                  gradient
                )}
              >
                <Icon className="h-5.5 w-5.5" />
              </div>

              {/* Career Info */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-700">
                  {career.title}
                </h3>
                <span className="mt-0.5 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                  {industry}
                </span>
              </div>

              {/* Score Ring */}
              <div className="shrink-0">
                <MatchScoreRing score={score} size={72} strokeWidth={5} />
              </div>
            </div>

            {/* Skills List */}
            {career && (
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
                    {skill.name}
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

            {/* Description */}
            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">
              {career.description ?? "Deskripsi belum tersedia."}
            </p>

            {/* CTA */}
            <div className="mt-4 flex items-center justify-end">
              <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700">
                Lihat Detail
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

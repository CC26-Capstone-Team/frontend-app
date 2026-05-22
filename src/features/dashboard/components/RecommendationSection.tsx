"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  Code2,
  Database,
  BrainCircuit,
  TerminalSquare,
  LayoutTemplate,
  Server,
} from "lucide-react";
import RecommendationCard from "./RecommendationCard";
import { RecommendationProps } from "../types/dashboard.types";

// Mapping Icon Lucide pengganti Emoji
const ICONS = [
  Code2,
  Database,
  BrainCircuit,
  TerminalSquare,
  LayoutTemplate,
  Server,
];

// Dummy Skills sesuai bidang teknologi
const DUMMY_SKILLS = [
  ["React", "Next.js", "Tailwind CSS"],
  ["Express.js", "Fastify", "Node.js"],
  ["Python", "MobileNetV2", "YOLO"],
  ["Laravel", "PHP", "MySQL"],
  ["Linux", "Docker", "Vim"],
];

export default function RecommendationSection({
  recommendation,
  isLoading,
}: RecommendationProps) {
  // Mencari skor tertinggi untuk keperluan highlight (Top Match)
  const highestScore = recommendation
    ? Math.max(
        ...recommendation.map((rec) => parseFloat(rec.match_score) * 100),
        0
      )
    : 0;

  return (
    <section>
      {/* Section header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Rekomendasi Jalur Karir
          </h2>
          <p className="text-xs text-slate-400">
            Diurutkan berdasarkan tingkat kecocokan
          </p>
        </div>

        <Link
          href="/recommendations"
          className="group flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
        >
          Lihat semua
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center rounded-2xl border border-white/80 bg-white/60 py-12 backdrop-blur-xl">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
          <span className="ml-2 text-sm text-slate-400">
            Memuat rekomendasi...
          </span>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && (!recommendation || recommendation.length === 0) && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/60 py-12 backdrop-blur-xl">
          <TerminalSquare className="mb-3 h-8 w-8 text-slate-300" />
          <p className="text-sm font-semibold text-slate-700">
            Belum ada rekomendasi
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Coba analisis ulang profilmu
          </p>
        </div>
      )}

      {/* Card list */}
      {!isLoading && recommendation && recommendation.length > 0 && (
        <motion.div
          className="flex flex-col gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {recommendation.map((rec, index) => {
            const score = Math.round(parseFloat(rec.match_score) * 100);
            const isTopMatch = score === Math.round(highestScore);

            return (
              <motion.div
                key={rec.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
              >
                <RecommendationCard
                  title={rec.career.title}
                  match={score}
                  subtitle={rec.career.industry ?? undefined}
                  icon={ICONS[index % ICONS.length]}
                  skills={DUMMY_SKILLS[index % DUMMY_SKILLS.length]}
                  isTopMatch={isTopMatch}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}

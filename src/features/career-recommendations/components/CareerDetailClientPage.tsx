"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
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
  Building2,
  FileText,
  SearchX,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLatestSession } from "../hooks/use-career-recommendations";
import MatchScoreRing from "./MatchScoreRing";
import CourseSection from "./CourseSection";
import JobSection from "./JobSection";

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

const INDUSTRY_GRADIENTS: Record<string, string> = {
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

export default function CareerDetailClientPage() {
  const router = useRouter();
  const params = useParams();
  const careerId = params.careerId as string;

  const { data: session, isLoading } = useLatestSession();

  // Find the recommendation for this career
  const recommendation = useMemo(() => {
    if (!session?.recommendation_history) return null;
    return session.recommendation_history.find(
      (rec) => rec.career_id === careerId || rec.career.id === careerId
    );
  }, [session, careerId]);

  const career = recommendation?.career;
  const score = recommendation
    ? Math.round(parseFloat(recommendation.match_score) * 100)
    : 0;
  const industry = career?.industry ?? "Lainnya";
  const Icon = INDUSTRY_ICONS[industry] ?? Sparkles;
  const gradient =
    INDUSTRY_GRADIENTS[industry] ?? "from-slate-500 to-gray-500";

  // Loading
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  // Not found
  if (!recommendation || !career) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <SearchX className="mb-3 h-12 w-12 text-slate-300" />
        <p className="text-sm font-semibold text-slate-700">
          Karir tidak ditemukan
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Mungkin data rekomendasi sudah berubah.
        </p>
        <button
          onClick={() => router.push("/career-recommendations")}
          className="mt-4 cursor-pointer rounded-lg bg-indigo-100 px-4 py-2 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-200"
        >
          Kembali ke Rekomendasi
        </button>
      </div>
    );
  }

  return (
    <section className="w-full space-y-6">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push("/career-recommendations")}
        className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </motion.button>

      {/* ── Hero Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-sm backdrop-blur-xl"
      >
        {/* Top gradient accent */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Career info */}
          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
            >
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {career.title}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                  <Building2 className="h-3 w-3" />
                  {industry}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Score ring */}
          <div className="shrink-0 self-center">
            <MatchScoreRing score={score} size={110} strokeWidth={8} />
          </div>
        </div>
      </motion.div>

      {/* ── Description Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-white/80 bg-white/60 p-6 backdrop-blur-xl"
      >
        <div className="mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">Deskripsi</h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">
          {career.description ?? "Deskripsi untuk karir ini belum tersedia."}
        </p>
      </motion.div>

      {/* ── Course Recommendation Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-white/80 bg-white/60 p-6 backdrop-blur-xl"
      >
        <CourseSection careerTitle={career.title} />
      </motion.div>

      {/* ── Job Recommendation Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-white/80 bg-white/60 p-6 backdrop-blur-xl"
      >
        <JobSection careerId={career.id} />
      </motion.div>
    </section>
  );
}

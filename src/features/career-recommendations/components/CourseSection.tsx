"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Loader2,
  Sparkles,
  GraduationCap,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { useCourseRecommendation, useRefreshCourseRecommendation } from "../hooks/use-career-recommendations";
import type { CourseRecommendation } from "../types/career-recommendations.types";

const LEVEL_COLORS: Record<string, string> = {
  Dasar: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Menengah: "bg-blue-50 text-blue-700 border-blue-200",
  Lanjutan: "bg-purple-50 text-purple-700 border-purple-200",
};

interface CourseSectionProps {
  careerTitle: string;
}

export default function CourseSection({ careerTitle }: CourseSectionProps) {
  const { data: courseData, isFetching: isQueryFetching, isError, refetch } = useCourseRecommendation(careerTitle);
  const { mutateAsync: refreshCourse, isPending: isRefreshPending } = useRefreshCourseRecommendation(careerTitle);
  const [isSuccess, setIsSuccess] = useState(false);

  const isPending = isQueryFetching || isRefreshPending;

  const handleGenerate = async () => {
    try {
      await refreshCourse();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">
            Rekomendasi Kursus
          </h2>
        </div>
        
        {courseData && (
          <button
            onClick={handleGenerate}
            disabled={isPending || isSuccess}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
              isSuccess
                ? "bg-emerald-50 text-emerald-600"
                : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
            }`}
          >
            {isSuccess ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </motion.div>
                Berhasil
              </>
            ) : (
              <>
                <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} />
                {isPending ? "Memperbarui..." : "Rekomendasi Ulang"}
              </>
            )}
          </button>
        )}
      </div>

      {/* Not yet generated */}
      {!courseData && !isPending && !isError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/40 py-10"
        >
          <Sparkles className="mb-3 h-10 w-10 text-indigo-300" />
          <p className="text-sm font-semibold text-slate-700">
            Dapatkan rekomendasi kursus dari AI
          </p>
          <p className="mt-1 max-w-sm text-center text-xs text-slate-400">
            AI akan menganalisis skill kamu dan merekomendasikan kursus terbaik
            untuk menjadi <span className="font-semibold">{careerTitle}</span>.
          </p>
          <button
            onClick={handleGenerate}
            className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:brightness-110"
          >
            <Sparkles className="h-4 w-4" />
            Generate Rekomendasi
          </button>
        </motion.div>
      )}

      {/* Loading */}
      {isPending && !courseData && (
        <div className="flex flex-col items-center rounded-2xl border border-white/80 bg-white/60 py-12 backdrop-blur-xl">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          <p className="mt-3 text-sm font-medium text-slate-500">
            AI sedang menganalisis...
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Proses ini membutuhkan beberapa detik
          </p>
        </div>
      )}

      {/* Error */}
      {isError && !courseData && (
        <div className="flex flex-col items-center rounded-2xl border border-red-100 bg-red-50/60 py-10">
          <AlertCircle className="mb-2 h-8 w-8 text-red-300" />
          <p className="text-sm font-semibold text-red-700">
            Gagal mengenerate rekomendasi
          </p>
          <p className="mt-1 text-xs text-red-400">
            Layanan AI mungkin sedang sibuk. Silakan coba lagi.
          </p>
          <button
            onClick={handleGenerate}
            className="mt-4 cursor-pointer rounded-lg bg-red-100 px-4 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-200"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {courseData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isPending ? 0.5 : 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`space-y-4 transition-opacity ${isPending ? "pointer-events-none" : ""}`}
          >
            {/* Analysis Card */}
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-purple-50/60 p-5">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                  Analisis AI
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-700">
                {courseData.analysis}
              </p>
            </div>

            {/* Course Cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {courseData.courses.map((course, index) => {
                const levelClass =
                  LEVEL_COLORS[course.level] ??
                  "bg-slate-50 text-slate-600 border-slate-200";

                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="group flex flex-col rounded-xl border border-white/80 bg-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100/80">
                        <BookOpen className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${levelClass}`}
                      >
                        {course.level}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-800 leading-snug">
                      {course.topic}
                    </h4>

                    <p className="mt-2 flex-1 text-[11px] leading-relaxed text-slate-500">
                      {course.reason}
                    </p>

                    <div className="mt-3 flex items-center gap-1 border-t border-slate-100 pt-3">
                      <ExternalLink className="h-3 w-3 text-slate-400" />
                      <span className="text-[11px] font-medium text-slate-500">
                        {course.platform}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

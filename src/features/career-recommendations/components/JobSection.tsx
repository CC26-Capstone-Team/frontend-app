"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  ExternalLink,
  Building,
  Loader2,
  SearchX,
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useJobRecommendations, useRefreshJobRecommendations } from "../hooks/use-career-recommendations";

interface JobSectionProps {
  careerTitle: string;
}

export default function JobSection({ careerTitle }: JobSectionProps) {
  const { data: response, isLoading, isError, error } = useJobRecommendations(careerTitle);
  const { mutate: refresh, isPending: isRefreshing, isSuccess: refreshed, error: refreshError } = useRefreshJobRecommendations(careerTitle);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRefresh = () => {
    refresh(undefined, {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      },
    });
  };

  // Jika error (misalnya API SerpApi gagal atau AI sibuk)
  const errorMessage = error
    ? (error as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Gagal memuat lowongan pekerjaan"
    : null;

  const refreshErrorMsg = refreshError
    ? (refreshError as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Gagal memperbarui lowongan"
    : null;

  const analysis = response?.analysis;
  const jobs = response?.jobs;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Rekomendasi Lowongan Pekerjaan</h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Peluang karir terbaik yang sesuai dengan profilmu saat ini.
          </p>
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
            refreshed && showSuccess
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
          }`}
        >
          {isRefreshing ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Memperbarui...</span>
            </>
          ) : refreshed && showSuccess ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Diperbarui!</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              <span>Perbarui Lowongan</span>
            </>
          )}
        </button>
      </div>

      {/* Refresh info banner */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3"
          >
            <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
            <p className="text-xs font-medium text-indigo-700">
              AI sedang mencari lowongan terbaru dari perusahaan Indonesia untuk kamu...
            </p>
          </motion.div>
        )}
        {refreshErrorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
            <p className="text-xs font-medium text-red-700">{refreshErrorMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/60 py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          <p className="mt-3 text-sm font-semibold text-slate-700">Mencari lowongan pekerjaan asli...</p>
          <p className="mt-1 text-xs text-slate-500">
            Sedang mencari data terbaru dari Google Jobs dan menganalisis kecocokan dengan profil Anda menggunakan AI.
          </p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/60 py-12 px-4 text-center">
          <SearchX className="mb-3 h-8 w-8 text-red-400" />
          <p className="text-sm font-bold text-red-800">Tidak Dapat Memuat Lowongan</p>
          <p className="mt-1 text-xs text-red-600 max-w-sm">{errorMessage}</p>
        </div>
      )}

      {/* Success State */}
      {!isLoading && !isError && response && (
        <div className="space-y-6">
          {/* Analysis Banner */}
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Analisis Kecocokan AI</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {analysis}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Empty Jobs (tapi response berhasil, mungkin Google Jobs ga ada hasil) */}
          {(!jobs || jobs.length === 0) ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/60 py-12 px-4 text-center">
              <SearchX className="mb-3 h-8 w-8 text-slate-300" />
              <p className="text-sm font-bold text-slate-700">Tidak ada lowongan ditemukan</p>
              <p className="mt-1 text-xs text-slate-500">
                Belum ada lowongan terbaru untuk posisi ini di Indonesia saat ini.
              </p>
            </div>
          ) : (
            /* Jobs Grid */
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {jobs.map((job, index) => {
                  const bgColors = [
                    "bg-blue-100 text-blue-600",
                    "bg-emerald-100 text-emerald-600",
                    "bg-purple-100 text-purple-600",
                    "bg-amber-100 text-amber-600",
                    "bg-rose-100 text-rose-600",
                    "bg-cyan-100 text-cyan-600",
                  ];
                  const logoBg = bgColors[index % bgColors.length];

                  return (
                    <motion.div
                      key={job.id || index}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="group flex flex-col rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md backdrop-blur-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${logoBg}`}>
                            <Building className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate text-sm font-bold text-slate-800" title={job.title}>
                              {job.title}
                            </h4>
                            <p className="truncate text-xs font-medium text-slate-500" title={job.company_name}>
                              {job.company_name}
                            </p>
                          </div>
                        </div>
                        {/* Match Score */}
                        <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-indigo-50 px-2 py-1.5 ring-1 ring-indigo-100/50">
                          <span className="text-[10px] font-bold text-indigo-700">{job.match_score}%</span>
                          <span className="text-[8px] font-semibold uppercase tracking-wider text-indigo-400">Match</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100/80 px-2 py-1 text-[10px] font-semibold text-slate-600">
                          <MapPin className="h-3 w-3" /> {job.location || "Indonesia"}
                        </span>
                        {job.via && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100/80 px-2 py-1 text-[10px] font-semibold text-slate-600 truncate max-w-[120px]">
                            <Target className="h-3 w-3" /> {job.via}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex-1">
                        <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
                          {job.match_reason}
                        </p>
                      </div>

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <a
                          href={job.apply_link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-95"
                        >
                          Lamar Pekerjaan
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

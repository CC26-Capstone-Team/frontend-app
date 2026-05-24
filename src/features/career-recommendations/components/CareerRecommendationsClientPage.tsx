"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Loader2,
  CalendarDays,
  BarChart3,
  SearchX,
} from "lucide-react";
import { useLatestSession } from "../hooks/use-career-recommendations";
import CareerCard from "./CareerCard";
import IndustryFilter from "./IndustryFilter";

export default function CareerRecommendationsClientPage() {
  const { data: session, isLoading, isError } = useLatestSession();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Sort recommendations by match score (descending)
  const sortedRecommendations = useMemo(() => {
    if (!session?.recommendation_history) return [];
    return [...session.recommendation_history].sort(
      (a, b) => parseFloat(b.match_score) - parseFloat(a.match_score)
    );
  }, [session]);

  // Extract unique industries
  const industries = useMemo(() => {
    const set = new Set<string>();
    sortedRecommendations.forEach((rec) => {
      if (rec.career.industry) set.add(rec.career.industry);
    });
    return Array.from(set).sort();
  }, [sortedRecommendations]);

  // Filter by selected industry
  const filteredRecommendations = useMemo(() => {
    if (!selectedIndustry) return sortedRecommendations;
    return sortedRecommendations.filter(
      (rec) => rec.career.industry === selectedIndustry
    );
  }, [sortedRecommendations, selectedIndustry]);

  // Highest score for "Top Match"
  const highestScore = sortedRecommendations.length
    ? parseFloat(sortedRecommendations[0].match_score)
    : 0;

  // Format session date
  const sessionDate = session?.created_at
    ? new Date(session.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <section className="w-full space-y-6">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-200">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Rekomendasi Karir
              </h1>
              <p className="text-xs text-slate-400">
                Jalur karir terbaik berdasarkan profil dan skillmu
              </p>
            </div>
          </div>

          {sessionDate && (
            <div className="mt-2 flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 text-[11px] font-medium text-slate-500 backdrop-blur-sm sm:mt-0">
              <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
              Analisis terakhir: {sessionDate}
            </div>
          )}
        </div>

        {/* Stats summary bar */}
        {sortedRecommendations.length > 0 && (
          <div className="mt-4 flex items-center gap-4 rounded-xl border border-white/80 bg-white/50 px-4 py-2.5 backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-indigo-500" />
              <span className="text-xs font-semibold text-slate-700">
                {sortedRecommendations.length}
              </span>
              <span className="text-xs text-slate-400">
                karir direkomendasikan
              </span>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400">Skor tertinggi:</span>
              <span className="text-xs font-bold text-indigo-600">
                {Math.round(highestScore * 100)}%
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* ── Loading State ── */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/60 py-20 backdrop-blur-xl">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          <p className="mt-3 text-sm font-medium text-slate-500">
            Memuat rekomendasi karir...
          </p>
        </div>
      )}

      {/* ── Error State ── */}
      {isError && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/60 py-16 backdrop-blur-xl">
          <SearchX className="mb-3 h-10 w-10 text-red-300" />
          <p className="text-sm font-semibold text-red-700">
            Gagal memuat rekomendasi
          </p>
          <p className="mt-1 text-xs text-red-400">
            Pastikan kamu sudah melakukan analisis profil terlebih dahulu.
          </p>
        </div>
      )}

      {/* ── Empty State ── */}
      {!isLoading && !isError && sortedRecommendations.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/60 py-20 backdrop-blur-xl">
          <Target className="mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm font-semibold text-slate-700">
            Belum ada rekomendasi
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Lakukan analisis profil di Dashboard untuk mendapatkan rekomendasi
            karir.
          </p>
        </div>
      )}

      {/* ── Industry Filter ── */}
      {!isLoading && filteredRecommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <IndustryFilter
            industries={industries}
            selected={selectedIndustry}
            onSelect={setSelectedIndustry}
          />
        </motion.div>
      )}

      {/* ── Cards Grid ── */}
      {!isLoading && filteredRecommendations.length > 0 && (
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {filteredRecommendations.map((rec, index) => {
            const score = parseFloat(rec.match_score);
            const isTopMatch = score === highestScore;
            return (
              <CareerCard
                key={rec.id}
                recommendation={rec}
                index={index}
                isTopMatch={isTopMatch}
                skills={rec.career.skills}
              />
            );
          })}
        </motion.div>
      )}

      {/* ── No results after filter ── */}
      {!isLoading &&
        sortedRecommendations.length > 0 &&
        filteredRecommendations.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/60 py-12 backdrop-blur-xl">
            <SearchX className="mb-2 h-8 w-8 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">
              Tidak ada karir di industri ini
            </p>
            <button
              onClick={() => setSelectedIndustry(null)}
              className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Tampilkan semua
            </button>
          </div>
        )}
    </section>
  );
}

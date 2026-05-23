"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, ExternalLink, Building, Clock, Loader2, SearchX } from "lucide-react";
import { useJobRecommendations } from "../hooks/use-career-recommendations";

interface JobSectionProps {
  careerId: string;
}

export default function JobSection({ careerId }: JobSectionProps) {
  const { data: jobs, isLoading, isError } = useJobRecommendations(careerId);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-indigo-600" />
        <h2 className="text-base font-bold text-slate-900">Rekomendasi Lowongan Pekerjaan</h2>
      </div>
      <p className="text-xs text-slate-500">
        Peluang karir terbaik yang sesuai dengan profilmu saat ini.
      </p>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/60 py-12">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
          <p className="mt-2 text-xs font-medium text-slate-500">Mencari lowongan pekerjaan...</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/60 py-10">
          <SearchX className="mb-2 h-6 w-6 text-red-300" />
          <p className="text-xs font-semibold text-red-700">Gagal memuat lowongan</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && (!jobs || jobs.length === 0) && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/60 py-10">
          <Briefcase className="mb-2 h-6 w-6 text-slate-300" />
          <p className="text-xs font-semibold text-slate-600">Belum ada lowongan tersedia</p>
        </div>
      )}

      {/* Results */}
      {!isLoading && !isError && jobs && jobs.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => {
            // Kita bisa random warna logo bg untuk data dari db
            const bgColors = ["bg-blue-100 text-blue-600", "bg-emerald-100 text-emerald-600", "bg-purple-100 text-purple-600", "bg-amber-100 text-amber-600"];
            const logoBg = bgColors[index % bgColors.length];
            
            // Format tanggal (contoh: '2 hari lalu' atau timestamp biasa)
            const date = new Date(job.posted_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

            return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="group flex flex-col rounded-xl border border-white/80 bg-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${logoBg}`}>
                  <Building className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-bold text-slate-800">{job.role}</h4>
                  <p className="truncate text-xs font-medium text-slate-500">{job.company}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                  <MapPin className="h-3 w-3" /> {job.location}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                  <Clock className="h-3 w-3" /> {job.type}
                </span>
                {job.salary && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                    <DollarSign className="h-3 w-3" /> {job.salary}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-[10px] text-slate-400">Diposting {date}</span>
                <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
                  Lamar
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      )}
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Frown,
  Sparkles,
  SearchX,
  FileWarning,
  BrainCircuit,
  Target,
  Map,
} from "lucide-react";

export default function ProblemSolution() {
  return (
    <section className="relative overflow-hidden bg-indigo-50 py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* === HEADER SECTION === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Sering Merasa{" "}
            <span className="text-slate-400 line-through decoration-rose-500 decoration-4">
              Salah Jurusan
            </span>{" "}
            atau <span className="text-rose-500">Bingung Karir?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Kamu tidak sendirian. Tanpa arah yang jelas, ribuan talenta membuang
            waktu mempelajari keahlian yang tidak sesuai dengan potensi asli
            mereka.
          </p>
        </motion.div>

        {/* === VISUAL JOURNEY FLOW === */}
        <div className="relative flex flex-col items-center">
          {/* 1. NODE MASALAH (The "Before") */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl rounded-2xl border border-slate-200/50 bg-white/40 p-6 backdrop-blur-sm md:p-8"
          >
            <div className="mb-6 flex items-center justify-center gap-2 text-slate-500">
              <Frown className="h-5 w-5" />
              <span className="text-sm font-bold tracking-wider uppercase">
                Kondisi Saat Ini
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl bg-white/50 p-4 shadow-sm">
                <SearchX className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                <p className="text-sm text-slate-600">
                  Apply lamaran secara acak tanpa strategi yang jelas.
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-white/50 p-4 shadow-sm">
                <FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                <p className="text-sm text-slate-600">
                  Ikut banyak kursus tapi CV tetap tidak dilirik HRD.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 2. SVG ANIMATED CONNECTOR LINE (Tangled to Straight) */}
          <div className="relative my-4 flex h-62.5 w-full max-w-50 flex-col items-center justify-center">
            <svg
              viewBox="0 0 100 250"
              className="absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="xMidYMin meet"
            >
              {/* Definisi Warna Gradien */}
              <defs>
                <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />{" "}
                  {/* indigo-400 (Warna awal AI) */}
                  <stop offset="100%" stopColor="#10b981" />{" "}
                  {/* emerald-500 (Warna solusi) */}
                </linearGradient>
              </defs>

              {/* Garis Dasar (Background abu-abu redup) */}
              {/* Path ini dimulai dengan melengkung/kusut, lalu ditarik lurus ke bawah */}
              <path
                d="M 50 0 C 10 30, 90 60, 50 90 C 10 120, 90 150, 50 180 L 50 250"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 4" // Dibuat putus-putus halus
              />

              {/* Garis Cahaya Berjalan (Animasi Framer Motion) */}
              <motion.path
                d="M 50 0 C 10 30, 90 60, 50 90 C 10 120, 90 150, 50 180 L 50 250"
                fill="none"
                stroke="url(#flowGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.7, 1], // Mengontrol ritme animasi agar ada jeda natural
                }}
              />
            </svg>

            {/* Target Dot di ujung bawah garis */}
            <div className="absolute -bottom-2.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-md ring-4 ring-emerald-500/20" />
          </div>

          {/* 3. NODE SOLUSI (The "After") */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative w-full max-w-3xl"
          >
            {/* AWS Glow Effect */}
            <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40" />

            <div className="relative z-10 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl md:p-10">
              <div className="mb-8 flex flex-col items-center justify-center gap-2 text-center">
                <div className="flex w-fit items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-indigo-700">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-bold tracking-wider uppercase">
                    Transformasi CarPathMu
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  Kepastian Arah Berbasis Data
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
                    <BrainCircuit className="h-7 w-7" />
                  </div>
                  <h4 className="mb-2 font-bold text-slate-900">Pemetaan AI</h4>
                  <p className="text-sm text-slate-600">
                    Menganalisis potensi aslimu secara objektif menggunakan Deep
                    Learning.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-50 text-fuchsia-600 shadow-inner">
                    <Target className="h-7 w-7" />
                  </div>
                  <h4 className="mb-2 font-bold text-slate-900">
                    Kursus Tepat
                  </h4>
                  <p className="text-sm text-slate-600">
                    Hanya merekomendasikan materi yang relevan dengan target
                    karirmu.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner">
                    <Map className="h-7 w-7" />
                  </div>
                  <h4 className="mb-2 font-bold text-slate-900">
                    Roadmap Otomatis
                  </h4>
                  <p className="text-sm text-slate-600">
                    Mendapatkan panduan langkah demi langkah layaknya mentor
                    pribadi.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

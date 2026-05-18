"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Cpu } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="mx-auto max-w-6xl px-4 py-16 pb-32"
    >
      {/* Kontainer Utama CTA - Dark Mode */}
      <div className="relative z-0 overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-950 px-6 py-16 shadow-2xl md:px-12 md:py-20">
        
        {/* === LAYER AKSEN ANIMASI DIPERKUAT (NEON GLOW) === */}
        {/* 1. Emerald Blob (Pojok Kanan Atas) */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          // Perubahan: Ukuran diperkecil di mobile (h-40 w-40, blur-50px), normal di md
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/40 blur-[50px] mix-blend-screen md:h-80 md:w-80 md:blur-[100px]"
        />

        {/* 2. Fuchsia Blob (Pojok Kiri Bawah) */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          // transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          // Perubahan: Ukuran diperkecil di mobile (h-40 w-40, blur-50px), normal di md
          className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/40 blur-[50px] mix-blend-screen md:h-80 md:w-80 md:blur-[100px]"
        />

        {/* 3. Indigo/Purple Blob (Tengah) */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          // Perubahan: Ukuran diperkecil di mobile (h-60 w-60, blur-60px), normal di md
          className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 blur-[60px] mix-blend-screen md:h-[500px] md:w-[500px] md:blur-[120px]"
        />
        {/* ------------------------------------------------ */}

        {/* === GRID BACKGROUND === */}
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        {/* --- LAYER KONTEN UTAMA --- */}
        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          >
            <Cpu className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-semibold tracking-wide text-slate-300">
              Mesin Rekomendasi Siap Diuji
            </span>
          </motion.div>

          <div className="max-w-3xl space-y-4">
            <h3 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              Pangkas Ketidakpastian Karir,{" "}
              <span className="bg-linear-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-sm">
                Mulai Berbasis Data.
              </span>
            </h3>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              Siap melihat ke mana algoritma cerdas membawa arah belajarmu? Lakukan analisis profil sekarang dan dapatkan roadmap yang dirancang khusus untuk potensimu.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-2"
          >
            <Button
              // Perubahan: Menambahkan hover:text-indigo-700 agar teks tidak hitam saat di-hover
              className="group relative overflow-hidden rounded-2xl bg-white px-8 py-7 text-base font-bold text-slate-900 transition-all duration-300 hover:scale-105 hover:bg-slate-100 hover:text-indigo-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              asChild
            >
              <Link href="/register">
                <span className="relative z-10 flex items-center gap-2">
                  {/* Ikon Sparkles sudah indigo, jadi aman */}
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                  Mulai Analisis Gratis
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
          </motion.div>
          
        </div>
      </div>
    </motion.section>
  );
}
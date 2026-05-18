"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-16"
    >
      {/* Kontainer Utama CTA - Padding atas-bawah (py) dikurangi agar tidak terlalu tinggi */}
      <div className="relative z-0 overflow-hidden rounded-3xl bg-indigo-600 px-6 py-12 shadow-2xl md:px-12 md:py-12">
        {/* === LAYER AKSEN ANIMASI === */}
        {/* Ukuran blob sedikit diperkecil agar pas dengan tinggi kotak yang baru */}

        {/* 1. Emerald Blob (Pojok Kanan Atas) */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-emerald-400/40 blur-[80px]"
        />

        {/* 2. Fuchsia Blob (Pojok Kiri Bawah) */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-fuchsia-400/40 blur-[80px]"
        />

        {/* 3. Purple Blob (Tengah) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/40 blur-[100px]"
        />
        {/* ------------------------------------------------ */}

        {/* --- LAYER KONTEN UTAMA --- */}
        <div className="relative z-10 flex flex-col items-center gap-5 text-center text-white">
          <h3 className="text-xl leading-tight font-extrabold tracking-tight md:text-2xl">
            Siap Menemukan Karir Impianmu?
          </h3>
          <p className="md:text-md max-w-2xl text-base text-indigo-100 opacity-90">
            Bergabung dengan 5.000+ profesional yang sudah menemukan jalur karir
            terbaik mereka bersama CarPathMu.
          </p>

          <Button
            className="mt-4 rounded-full bg-white px-10 py-6 text-sm font-bold text-indigo-700 transition-all duration-300 hover:bg-white/90 hover:text-indigo-800 hover:shadow-lg hover:shadow-white/20"
            variant="ghost"
          >
            Mulai Sekarang — Gratis!
          </Button>
        </div>
      </div>
    </motion.section>
  );
}

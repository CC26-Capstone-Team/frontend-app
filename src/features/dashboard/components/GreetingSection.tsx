"use client";

import { Button } from "@/components/ui/button";
import { motion, type Variants, type Easing } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { GreetingSectionProps } from "../types/dashboard.types";

// Variants untuk efek muncul bergantian (stagger)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as Easing },
  },
};

export default function GreetingSection({
  user,
  onReanalyze,
}: GreetingSectionProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end"
    >
      {/* === LEFT: Badge + Title === */}
      <div className="space-y-3">
        {/* Status badge dengan efek ping pulse yang lebih smooth */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2.5 rounded-full border border-indigo-200/60 bg-white/70 px-3.5 py-1.5 shadow-sm backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
          </span>
          <span className="text-xs font-bold text-indigo-600">
            Profil diperbarui hari ini
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Selamat datang,{" "}
            <span className="bg-linear-to-r from-indigo-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              {user?.username}
            </span>{" "}
            {/* Animasi tangan melambai looping */}
            <motion.span
              className="inline-block origin-bottom-right"
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            >
              👋
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm font-medium text-slate-500 sm:text-base"
        >
          Berikut rekomendasi jalur karir berdasarkan profil teknismu.
        </motion.p>
      </div>

      {/* === RIGHT: CTA Button === */}
      <motion.div variants={itemVariants}>
        <Button
          variant="outline"
          onClick={onReanalyze} // Pasangkan prop di sini
          className="group relative overflow-hidden rounded-2xl border border-indigo-200/60 bg-white/70 px-6 py-6 text-sm font-bold text-indigo-600 shadow-sm shadow-indigo-100 backdrop-blur-md transition-all hover:border-indigo-300 hover:bg-white hover:shadow-md hover:shadow-indigo-200/50"
        >
          {/* Efek kilau (shine) yang lewat saat di-hover */}
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-indigo-100/40 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

          <RefreshCw className="mr-2 h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
          <span className="relative z-10">Analisis Ulang</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}

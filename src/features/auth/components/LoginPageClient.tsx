"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import { Sparkles, BrainCircuit, Target } from "lucide-react";

export default function LoginPageClient() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-indigo-50 p-4 md:p-6">
      {/* --- LAYER AKSEN DENGAN ANIMASI BERGERAK NAIK TURUN --- */}

      {/* Blob Fuchsia */}
      <motion.div
        animate={{
          x: [0, 40, -20, 60, 0],
          y: [0, -80, -140, -60, 0],
          scale: [1, 1.4, 1.2, 1.5, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-fuchsia-400/60 blur-[80px]"
      />

      {/* Blob Emerald */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1.3, 1.6, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-[450px] w-[450px] rounded-full bg-emerald-400/60 blur-[80px]"
      />

      {/* Blob Indigo */}
      <motion.div
        animate={{
          y: [0, -70, -30, -90, 0],
          scale: [1, 1.5, 1.3, 1.6, 1],
          opacity: [0.2, 0.5, 0.3, 0.55, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/50 blur-[100px]"
      />

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[url(/grid.svg)] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* === MAIN CONTAINER === */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-md max-h-[95vh] overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 shadow-2xl backdrop-blur-xl lg:max-w-6xl lg:flex-row"
      >
        {/* --- LEFT PANE (Hidden on Mobile) --- */}
        <div className="hidden w-full flex-col overflow-y-auto border-r border-slate-200/40 p-6 lg:flex lg:w-5/12 lg:p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Logo */}
          <Link
            href="/"
            className="group flex w-fit items-center transition-opacity hover:opacity-80"
          >
            <Image
              src={`/logo.png?v=${process.env.NEXT_PUBLIC_APP_VERSION || Date.now()}`}
              alt="CarPathMu"
              width={160}
              height={44}
              className="h-10 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Value Content */}
          <div className="mt-4 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100/50 px-3 py-1.5 text-xs font-semibold text-indigo-700 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              Lanjutkan Perjalanan Anda
            </div>

            <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-4xl">
              Kembali ke{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                Roadmap
              </span>{" "}
              Masa Depanmu.
            </h1>

            <p className="text-sm leading-relaxed text-slate-600">
              Masuk untuk melihat progres, mengecek rekomendasi karir terbaru, dan merencanakan langkah selanjutnya bersama asisten AI Anda.
            </p>

            {/* Feature Badges - Disesuaikan dengan konteks login */}
            <div className="flex flex-col gap-4 border-t border-slate-200/60 pt-5">
              {[
                {
                  icon: BrainCircuit,
                  color: "text-indigo-600",
                  bg: "bg-indigo-100",
                  title: "Analisis Tersimpan",
                  desc: "Data profil dan potensimu aman tersimpan.",
                },
                {
                  icon: Target,
                  color: "text-fuchsia-600",
                  bg: "bg-fuchsia-100",
                  title: "Rekomendasi Terupdate",
                  desc: "Lihat peluang kursus dan karir terbaru.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.bg} ${item.color}`}
                  >
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-auto pt-6 text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} CarPathMu. Hak Cipta Dilindungi.
          </div>
        </div>

        {/* --- RIGHT PANE (Form Utama) --- */}
        <div className="flex w-full flex-col justify-center overflow-y-auto bg-white/60 p-6 sm:p-8 lg:w-7/12 lg:p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Mobile Logo Container */}
          <div className="mb-6 flex items-center justify-center lg:hidden">
            <Image
              src={`/logo.png?v=${process.env.NEXT_PUBLIC_APP_VERSION || Date.now()}`}
              alt="CarPathMu"
              width={140}
              height={36}
              className="h-9 w-auto object-contain"
              priority
              unoptimized
            />
          </div>

          {/* Komponen Form */}
          <LoginForm />
        </div>
      </motion.div>
    </div>
  );
}
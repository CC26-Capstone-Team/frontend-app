import React from "react";
import Link from "next/link";
import { Compass, Sparkles, ShieldCheck } from "lucide-react";
import RegisterForm from "@/components/shared/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50">
      {/* Left Pane - Premium Illustration & Dynamic Background */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-indigo-950 p-12 text-white lg:flex">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 size-96 translate-x-1/2 translate-y-1/2 rounded-full bg-[#0f9488]/20 blur-3xl" />

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
            <Compass className="size-5.5 animate-pulse text-indigo-400" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight">
            CarPath<span className="text-[#0f9488]">Mu</span>
          </span>
        </div>

        {/* Dynamic Centerpiece */}
        <div className="relative z-10 my-auto max-w-lg space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-[#0f9488]/10 px-3 py-1 text-xs font-semibold text-teal-300 backdrop-blur-sm">
            <Sparkles className="size-3.5 text-[#0f9488]" />
            Daftar Cepat & Gratis
          </div>
          <h1 className="font-heading text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
            Langkah Pertama Menuju Karir Sukses Anda
          </h1>
          <p className="text-base leading-relaxed text-indigo-200/80">
            Hanya butuh 1 menit untuk mendaftarkan akun. Mulai jalani tes
            rekomendasi dan biarkan algoritma pintar kami menganalisis pilihan
            karir terbaik Anda.
          </p>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-indigo-200/90">
            <div className="flex items-center gap-3">
              <div className="flex size-6 items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/20 text-teal-400">
                <ShieldCheck className="size-4" />
              </div>
              <span>Validasi potensi minat dan bakat realtime</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-6 items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/20 text-teal-400">
                <ShieldCheck className="size-4" />
              </div>
              <span>Analisis komparasi industri terkini</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-6 items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/20 text-teal-400">
                <ShieldCheck className="size-4" />
              </div>
              <span>Akses penuh laporan riwayat diagnosis hasil</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-indigo-300/50">
          © {new Date().getFullYear()} CarPathMu. All rights reserved.
        </div>
      </div>

      {/* Right Pane - Form Card */}
      <div className="relative flex w-full items-center justify-center p-6 md:p-12 lg:w-1/2">
        {/* Glow on mobile backgrounds */}
        <div className="absolute top-10 right-10 size-72 rounded-full bg-indigo-200/30 blur-3xl lg:hidden" />
        <div className="absolute bottom-10 left-10 size-72 rounded-full bg-teal-100/30 blur-3xl lg:hidden" />

        <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50 md:p-10">
          {/* Logo on mobile header */}
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-600">
              <Compass className="size-5 text-white" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-slate-900">
              CarPath<span className="text-[#0f9488]">Mu</span>
            </span>
          </div>

          {/* Form */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

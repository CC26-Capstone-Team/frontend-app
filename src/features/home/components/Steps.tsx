"use client";

import { motion } from "framer-motion";
import { User, UserPlus, BrainCircuit, Rocket } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Isi Profil Kamu",
    description: "Ceritakan skill, minat, dan pengalamanmu dalam form singkat.",
    icon: User,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    glowColor: "shadow-indigo-500/30",
  },
  {
    step: 2,
    title: "Login / Daftar",
    description:
      "Buat akun gratis untuk menyimpan dan mengakses hasilmu kapan saja.",
    icon: UserPlus,
    color: "text-fuchsia-600",
    bgColor: "bg-fuchsia-100",
    glowColor: "shadow-fuchsia-500/30",
  },
  {
    step: 3,
    title: "AI Menganalisis",
    description:
      "Model Deep Learning memproses datamu untuk mencari kecocokan karir.",
    icon: BrainCircuit,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    glowColor: "shadow-purple-500/30",
  },
  {
    step: 4,
    title: "Lihat Hasil",
    description:
      "Dapatkan roadmap karir, kursus, dan rekomendasi pekerjaan yang sesuai.",
    icon: Rocket,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    glowColor: "shadow-emerald-500/30",
  },
];

export default function Step() {
  return (
    <section id="steps" className="relative overflow-hidden bg-indigo-50 py-24">
      {/* Background Ornamen halus agar menyatu dengan section atas/bawah */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30">
        <div className="h-125 w-125 rounded-full bg-white blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="block bg-linear-to-r from-indigo-600 to-emerald-600 bg-clip-text text-sm font-bold tracking-widest text-transparent uppercase">
            Cara Kerja
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            4 Langkah Menuju Karir yang Tepat
          </h2>
        </motion.div>

        {/* TIMELINE CONTAINER */}
        <div className="relative mt-8 md:mt-16">
          {/* Garis Latar (HANYA MUNCUL DI DESKTOP) */}
          <div className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-1 rounded-full bg-slate-200/60 md:block">
            {/* Garis Progres Animasi (Desktop) */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="h-full rounded-full bg-linear-to-r from-indigo-500 via-fuchsia-500 to-emerald-500"
            />
          </div>

          {/* GRID KARTU LANGKAH */}
          {/* gap-12 di mobile karena ikon akan melayang keluar kartu, butuh jarak ekstra */}
          <div className="grid grid-cols-1 gap-12 pt-4 md:grid-cols-4 md:gap-8 md:pt-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.2 }}
                className="relative flex flex-col items-center"
              >
                {/* LINGKARAN IKON */}
                {/* -mb-7 di mobile menarik kartu di bawahnya naik agar ikon terlihat melayang di atas batas kartu */}
                <div className="relative z-10 -mb-7 md:mb-6">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.bgColor} shadow-lg ${step.glowColor} border-2 border-white transition-transform duration-300 hover:scale-110`}
                  >
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                  {/* Badge Angka Kecil */}
                  <div
                    className={`absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white ${step.bgColor} ${step.color} text-xs font-black shadow-sm`}
                  >
                    {step.step}
                  </div>
                </div>

                {/* KARTU KONTEN (Glassmorphism) */}
                {/* pt-10 di mobile untuk memberi ruang pada ikon yang menabrak dari atas */}
                <div className="w-full rounded-2xl border border-white/60 bg-white/40 px-6 pt-10 pb-6 text-center shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/60 hover:shadow-lg md:p-6">
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

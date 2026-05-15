"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface StepsProps {
  step: number;
  description: string;
  title: string;
  titleClassname: string;
}

const steps: StepsProps[] = [
  {
    step: 1,
    description: "Ceritakan skill, minat, dan pengalamanmu dalam form singkat",
    title: "Isi Profil Kamu",
    titleClassname: "bg-indigo-100 text-indigo-700",
  },
  {
    step: 2,
    description:
      "Buat akun gratis untuk menyimpan dan mengakses hasilmu kapan saja",
    title: "Login / Daftar",
    titleClassname: "bg-fuchsia-100 text-fuchsia-700",
  },
  {
    step: 3,
    description:
      "Model deep Learning memproses datamu dan menghasilkan rekomendasi personal",
    title: "AI Menganalisis",
    titleClassname: "bg-purple-100 text-purple-700",
  },
  {
    step: 4,
    description:
      "Dapatkan rekomendasi karir, kursus, dan lowongan pekerjaan untukmu",
    title: "Lihat Hasil",
    titleClassname: "bg-emerald-100 text-emerald-700",
  },
];

export default function Step() {
  return (
    <section className="space-y-2 bg-indigo-50/50 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <span className="block bg-linear-to-r from-indigo-600 to-emerald-600 bg-clip-text text-center text-sm font-medium text-transparent">
          CARA KERJA
        </span>
        <h3 className="text-center text-2xl font-bold tracking-tight text-slate-900">
          4 Langkah Menuju Karir yang Tepat
        </h3>
      </motion.div>

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + step.step * 0.2 }}
            className="flex h-full w-full"
          >
            {/* Wrapper interaktif untuk efek pendaran (AWS-style glow) */}
            <div className="group relative flex w-full flex-col">
              {/* 1. Layer Pendaran (Glow) di belakang Card */}
              <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-50" />

              {/* 2. Komponen Card Shadcn UI */}
              <Card className="relative z-10 flex h-full w-full flex-col items-center border-slate-200/60 bg-white/95 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-transparent group-hover:shadow-2xl">
                <CardHeader className="flex flex-col items-center gap-2 pb-4">
                  {/* Lingkaran Angka */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold transition-transform duration-300 group-hover:scale-110 ${step.titleClassname}`}
                  >
                    {step.step}
                  </div>
                  <CardTitle className="mt-4 w-64 text-center text-base font-bold text-slate-900">
                    {step.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-center">
                  <CardDescription className="text-sm text-slate-500">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

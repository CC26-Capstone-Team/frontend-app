"use client";

import { motion } from "framer-motion";
import { Frown, Sparkles, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProblemSolution() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Sering Merasa <span className="text-rose-500">Salah Jurusan</span>{" "}
            atau <span className="text-rose-500">Bingung Karir?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Kamu tidak sendirian. Ribuan lulusan kesulitan mendapatkan pekerjaan
            karena tidak tahu harus fokus ke mana.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Card Masalah (Warna sedikit kemerahan/peringatan) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-rose-100 bg-rose-50/30 p-2 shadow-none">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex w-fit items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-rose-700">
                  <XCircle className="h-4 w-4" />
                  <span className="text-sm font-bold">Masalah Saat Ini</span>
                </div>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex gap-3">
                    <Frown className="h-6 w-6 shrink-0 text-rose-400" />
                    <span>
                      Hanya *apply* lamaran secara acak tanpa strategi yang
                      jelas.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Frown className="h-6 w-6 shrink-0 text-rose-400" />
                    <span>
                      Ikut banyak kursus tapi keahlian tidak dilirik oleh HRD.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Frown className="h-6 w-6 shrink-0 text-rose-400" />
                    <span>
                      Tidak punya mentor untuk memandu arah *roadmap* belajar.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card Solusi (CarPathMu dengan AWS Glow) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative h-full"
          >
            {/* Layer AWS Glow */}
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-60" />

            <Card className="relative z-10 h-full border-indigo-100 bg-white p-2 shadow-md transition-all group-hover:-translate-y-1 group-hover:border-transparent group-hover:shadow-2xl">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex w-fit items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-indigo-700">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-bold">Solusi CarPathMu</span>
                </div>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                    <span>
                      <strong>Pemetaan Berbasis AI:</strong> Algoritma kami
                      menganalisis kelebihanmu secara objektif.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-fuchsia-500" />
                    <span>
                      <strong>Kursus Tepat Sasaran:</strong> Hanya
                      merekomendasikan materi yang sedang dicari industri.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                    <span>
                      <strong>Roadmap Otomatis:</strong> Mendapatkan panduan
                      langkah demi langkah layaknya memiliki mentor pribadi.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

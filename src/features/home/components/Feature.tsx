"use client";

import { BookCopy, Briefcase, Map, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgTitleClassname: string;
  iconClassname: string;
}

// PERBAIKAN: Warna diselaraskan dengan tema (Indigo -> Fuchsia -> Purple -> Emerald)
const features: FeatureProps[] = [
  {
    icon: <Target className="h-5 w-5" />,
    title: "Rekomendasi Karir AI",
    description:
      "Analisis profil mendalam menggunakan Deep Learning untuk mencocokkan kamu dengan karir terbaik.",
    bgTitleClassname: "bg-indigo-100",
    iconClassname: "text-indigo-600",
  },
  {
    icon: <BookCopy className="h-5 w-5" />,
    title: "Rekomendasi Kursus",
    description:
      "Daftar kursus dari platform terkemuka (Coursera, Udemy, Dicoding) yang relevan dengan jalur karirmu.",
    bgTitleClassname: "bg-fuchsia-100",
    iconClassname: "text-fuchsia-600",
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: "Lowongan Pekerjaan",
    description:
      "Referensi lowongan dari LinkedIn, Glints, dan JobStreet yang sudah difilter sesuai profil unikmu.",
    bgTitleClassname: "bg-purple-100",
    iconClassname: "text-purple-600",
  },
  {
    icon: <Map className="h-5 w-5" />,
    title: "Roadmap Pengembangan",
    description:
      "Jalur belajar terstruktur dan langkah demi langkah untuk mencapai target karir impianmu.",
    bgTitleClassname: "bg-emerald-100",
    iconClassname: "text-emerald-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="space-y-12 bg-indigo-50/50 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <span className="block bg-linear-to-r from-indigo-600 to-emerald-600 bg-clip-text text-center text-sm font-medium text-transparent">
          FITUR UNGGULAN
        </span>
        <h3 className="mt-2 text-center text-3xl font-bold tracking-tight text-slate-900">
          Semua yang Kamu Butuhkan
        </h3>
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:px-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="group relative h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {/* 1. LAYER GLOW (AWS Spark Style) */}
            <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />

            {/* 2. CARD COMPONENT */}
            <Card className="relative z-10 h-full border-slate-200/60 bg-white/90 p-2 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-transparent group-hover:shadow-2xl">
              <CardContent className="flex items-start gap-5 pt-6">
                {/* Ikon Container */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${feature.bgTitleClassname} ${feature.iconClassname}`}
                >
                  {feature.icon}
                </div>

                {/* Teks Deskripsi */}
                <div className="space-y-1">
                  <span className="text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                    {feature.title}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

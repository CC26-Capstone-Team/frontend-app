"use client";

import { useState, useEffect, useRef } from "react";
import { type LucideProps } from "lucide-react";
import {
  BookCopy,
  Briefcase,
  Map,
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
  colorClass: string;
  bgColorClass: string;
}

const features: FeatureProps[] = [
  {
    icon: Target,
    title: "Rekomendasi Karir AI",
    description:
      "Analisis profil mendalam menggunakan Deep Learning untuk mencocokkan kamu dengan karir terbaik.",
    colorClass: "text-indigo-600",
    bgColorClass: "bg-indigo-100",
  },
  {
    icon: BookCopy,
    title: "Rekomendasi Kursus",
    description:
      "Daftar kursus dari platform terkemuka (Coursera, Udemy, Dicoding) yang relevan dengan jalur karirmu.",
    colorClass: "text-fuchsia-600",
    bgColorClass: "bg-fuchsia-100",
  },
  {
    icon: Briefcase,
    title: "Lowongan Pekerjaan",
    description:
      "Referensi lowongan dari LinkedIn, Glints, dan JobStreet yang sudah difilter sesuai profil unikmu.",
    colorClass: "text-purple-600",
    bgColorClass: "bg-purple-100",
  },
  {
    icon: Map,
    title: "Roadmap Pengembangan",
    description:
      "Jalur belajar terstruktur dan langkah demi langkah untuk mencapai target karir impianmu.",
    colorClass: "text-emerald-600",
    bgColorClass: "bg-emerald-100",
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = Maju (Kanan), -1 = Mundur (Kiri)

  // Ref untuk mendeteksi setiap tombol menu mobile agar bisa di-scroll otomatis ke tengah
  const mobileTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Fungsi pembantu untuk mengubah tab sekaligus menentukan arah geser
  const handleTabChange = (index: number) => {
    setDirection(index >= activeTab ? 1 : -1);
    setActiveTab(index);
  };

  // === EFFECT 1: AUTO-ROTATION ===
  useEffect(() => {
    const timer = setInterval(() => {
      // Saat berpindah otomatis dari tab terakhir (index 3) kembali ke awal (index 0),
      // kita set arahnya tetap maju (1) agar putaran swiper terasa konstan ke kanan.
      const nextIndex = (activeTab + 1) % features.length;
      setDirection(nextIndex === 0 ? 1 : 1);
      setActiveTab(nextIndex);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeTab]);

  // === EFFECT 2: MOBILE AUTO-SCROLL HORIZONTAL SAJA (TANPA JUMPING) ===
  useEffect(() => {
    const activeButton = mobileTabRefs.current[activeTab];
    const container = document.getElementById("mobile-tabs-container");

    if (activeButton && container) {
      // Hanya menggeser posisi horizontal di dalam kontainer tab
      // tanpa menyentuh scroll vertikal halaman (window)
      const scrollPos =
        activeButton.offsetLeft -
        container.clientWidth / 2 +
        activeButton.clientWidth / 2;

      container.scrollTo({
        left: scrollPos,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  // Varian animasi geser ala Swiper Slider
  const swiperVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-indigo-50/50 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* === HEADER SECTION === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="block bg-linear-to-r from-indigo-600 to-emerald-600 bg-clip-text text-sm font-bold tracking-widest text-transparent uppercase">
            Fitur Utama
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Semua yang Kamu Butuhkan
          </h2>
        </motion.div>

        {/* === MAIN INTERACTIVE CONTAINER === */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          {/* SISI KIRI: TABS HORIZONTAL (MOBILE) & NAVIGASI VERTIKAL (DESKTOP) */}
          {/* Mobile View: Centered & Auto-Scrolling Swiper Tabs */}
          <div
            id="mobile-tabs-container"
            className="no-scrollbar flex w-full snap-x justify-start gap-3 overflow-x-auto scroll-smooth px-4 pb-4 sm:justify-center lg:hidden"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  ref={(el) => {
                    mobileTabRefs.current[index] = el;
                  }} // Daftarkan ref tombol
                  onClick={() => handleTabChange(index)}
                  className={`flex shrink-0 snap-center items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? "border-indigo-200 bg-white text-indigo-600 shadow-md shadow-indigo-100/50"
                      : "border-transparent bg-white/40 text-slate-600 backdrop-blur-sm"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${isActive ? feature.colorClass : "text-slate-400"}`}
                  />
                  {feature.title}
                </button>
              );
            })}
          </div>

          {/* Desktop View: Vertical Hover List */}
          <div className="hidden flex-col gap-4 lg:flex">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeTab === index;
              return (
                <div
                  key={index}
                  onMouseEnter={() => handleTabChange(index)}
                  className={`group relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                    isActive
                      ? "border-white/80 bg-white/70 shadow-xl shadow-indigo-900/5 backdrop-blur-md"
                      : "border-transparent bg-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {isActive && (
                    <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 opacity-20 blur-lg" />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white bg-white shadow-sm transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                    >
                      <Icon className={`h-5 w-5 ${feature.colorClass}`} />
                    </div>
                    <div className="space-y-1">
                      <h3
                        className={`text-lg font-bold text-slate-900 transition-colors ${isActive ? "text-indigo-600" : ""}`}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SISI KANAN: MONITOR KACA PREVIEW (SWIPER EFFECT CONTENT) */}
          <div className="relative flex h-95 w-full flex-col overflow-hidden md:h-105">
            {/* Bingkai Utama Layar Kaca */}
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-2xl shadow-indigo-900/5 backdrop-blur-xl">
              {/* Top Window Bar */}
              <div className="relative z-20 flex items-center gap-2 border-b border-white/40 bg-white/30 px-5 py-3.5">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  Live Preview · {features[activeTab].title}
                </span>
              </div>

              {/* Area Konten dengan Efek Swiper Geser */}
              <div className="relative flex-1 overflow-hidden p-5 md:p-6">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <motion.div
                    key={activeTab}
                    custom={direction}
                    variants={swiperVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-x-0 top-0 bottom-0 space-y-4 p-5 md:p-6"
                  >
                    {activeTab === 0 && (
                      <div className="space-y-4">
                        <div className="rounded-xl border border-white/50 bg-white/60 p-4 shadow-sm">
                          <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                            Hasil Analisis Profil
                          </p>
                          <h4 className="mt-1 font-bold text-slate-800">
                            Selamat datang, Budi!
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {[
                            {
                              job: "Data Analyst",
                              match: "92% Match",
                              width: "92%",
                              tags: ["Python", "SQL", "Statistik"],
                              best: true,
                            },
                            {
                              job: "Machine Learning Engineer",
                              match: "85% Match",
                              width: "85%",
                              tags: ["Python", "TensorFlow", "Deep Learning"],
                              best: false,
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="rounded-xl border border-white/40 bg-white/40 p-4 shadow-inner"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-slate-800">
                                    {item.job}
                                  </span>
                                  {item.best && (
                                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                      Paling cocok
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs font-bold text-emerald-600">
                                  {item.match}
                                </span>
                              </div>
                              <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/50">
                                <div
                                  className="h-full rounded-full bg-emerald-500"
                                  style={{ width: item.width }}
                                />
                              </div>
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {item.tags.map((tag, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="rounded bg-white/70 px-2 py-0.5 text-[10px] font-medium text-slate-600 shadow-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 1 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                            Rekomendasi Kursus
                          </span>
                          <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600">
                            Lihat semua <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                        {[
                          {
                            title: "Python for Data Analysis",
                            platform: "Coursera",
                            scope: "Untuk Data Analyst",
                            dotColor: "bg-emerald-500",
                          },
                          {
                            title: "SQL Fundamentals & Advanced",
                            platform: "Dicoding",
                            scope: "Untuk Data Analyst",
                            dotColor: "bg-emerald-500",
                          },
                          {
                            title: "Machine Learning Specialization",
                            platform: "Coursera",
                            scope: "Untuk ML Engineer",
                            dotColor: "bg-amber-500",
                          },
                        ].map((course, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-xl border border-white/50 bg-white/60 p-4 shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-2 w-2 rounded-full ${course.dotColor}`}
                              />
                              <div>
                                <h5 className="text-sm font-bold text-slate-800">
                                  {course.title}
                                </h5>
                                <p className="text-[11px] text-slate-500">
                                  {course.platform} ·{" "}
                                  <span className="italic">{course.scope}</span>
                                </p>
                              </div>
                            </div>
                            <CheckCircle2 className="h-4 w-4 text-slate-300" />
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 2 && (
                      <div className="space-y-3">
                        <p className="px-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                          Lowongan Terfilter AI
                        </p>
                        {[
                          {
                            role: "Junior Data Analyst",
                            company: "TechCorp Indonesia",
                            loc: "Jakarta (Remote)",
                            match: "High Match",
                            matchColor: "bg-emerald-100 text-emerald-700",
                          },
                          {
                            role: "Business Intelligence Intern",
                            company: "FinGo Group",
                            loc: "Surabaya (Hybrid)",
                            match: "High Match",
                            matchColor: "bg-emerald-100 text-emerald-700",
                          },
                          {
                            role: "Data Engineer",
                            company: "Glow Creative",
                            loc: "Bandung (Onsite)",
                            match: "81% Match",
                            matchColor: "bg-indigo-100 text-indigo-700",
                          },
                        ].map((job, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-xl border border-white/50 bg-white/60 p-4 shadow-sm"
                          >
                            <div>
                              <h5 className="text-sm font-bold text-slate-800">
                                {job.role}
                              </h5>
                              <p className="text-xs text-slate-500">
                                {job.company} ·{" "}
                                <span className="font-medium">{job.loc}</span>
                              </p>
                            </div>
                            <span
                              className={`rounded-md px-2 py-1 text-[10px] font-bold ${job.matchColor}`}
                            >
                              {job.match}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 3 && (
                      <div className="space-y-4">
                        <p className="px-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                          Timeline Belajarmu
                        </p>
                        <div className="relative ml-2 space-y-5 border-l border-slate-300/60 pl-5">
                          {[
                            {
                              date: "Mei 2026",
                              task: "Mulai Python for Data Analysis",
                              active: true,
                            },
                            {
                              date: "Juni 2026",
                              task: "SQL Fundamentals & proyek mini",
                              active: true,
                            },
                            {
                              date: "Agustus 2026",
                              task: "Portofolio & apply kerja",
                              active: false,
                            },
                          ].map((time, i) => (
                            <div key={i} className="relative">
                              <div
                                className={`absolute top-1.5 -left-6.25 h-2.5 w-2.5 rounded-full border-2 border-white ring-4 ${time.active ? "bg-emerald-500 ring-emerald-500/20" : "bg-slate-300 ring-slate-300/10"}`}
                              />
                              <div>
                                <span className="text-[10px] font-bold text-slate-400">
                                  {time.date}
                                </span>
                                <p className="text-xs font-semibold text-slate-700">
                                  {time.task}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative min-h-[calc(100vh-60px)] overflow-hidden bg-indigo-50">
      {/* --- LAYER AKSEN DENGAN ANIMASI CROSSING WAVE (BERLAWANAN) --- */}

      {/* 1. Aksen Hijau (Emerald) - Mulai dari Kanan, bergerak ke Kiri */}
      <motion.div
        animate={{
          x: ["0vw", "-60vw", "0vw"], // Bergerak melintasi 60% layar ke kiri, lalu kembali
          y: [0, 40, 0], // Sedikit naik turun agar organik (gelombang)
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18, // Durasi panjang agar lambat dan elegan
          repeat: Infinity,
          ease: "easeInOut", // Penting: membuat perlambatan halus di ujung layar
        }}
        className="absolute -right-20 -bottom-20 h-125 w-125 rounded-full bg-emerald-400/30 mix-blend-multiply blur-[120px]"
      />

      {/* 2. Aksen Fuchsia/Pink - Mulai dari Kiri, bergerak ke Kanan */}
      <motion.div
        animate={{
          x: ["0vw", "60vw", "0vw"], // Bergerak melintasi 60% layar ke kanan, lalu kembali
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -left-20 h-125 w-125 rounded-full bg-fuchsia-400/30 mix-blend-multiply blur-[120px]"
      />

      {/* 3. Aksen Ungu (Purple) - Sebagai Penyeimbang di Tengah */}
      {/* Karena kiri dan kanan saling bertukar, kita butuh warna tengah yang 'bernapas' (pulsing) agar tidak ada kekosongan saat warna lain berada di ujung */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        // Posisikan persis di tengah menggunakan trik absolute + translate
        className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/20 mix-blend-multiply blur-[150px]"
      />
      {/* ------------------------------------------------ */}

      {/* --- LAYER KONTEN UTAMA --- */}
      <section className="relative z-10 flex flex-col items-center gap-6 px-4 py-20">
        {/* === KOMPONEN BADGE DENGAN ANIMASI SPARK === */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          // Container utama dengan padding 1.5px sebagai ketebalan border
          className="relative max-w-min min-w-max overflow-hidden rounded-full bg-indigo-200/50 p-[1.5px] shadow-sm"
        >
          {/* Layer Kilauan Cahaya (Spark) */}
          <motion.div
            animate={{
              rotate: [0, 720], // Bergerak 2 putaran penuh
              opacity: [0, 1, 1, 0], // Muncul -> Menyala -> Tahan -> Pudar dan hilang
            }}
            transition={{
              delay: 0.7, // Mulai berputar sesaat setelah badge muncul
              duration: 5, // DIPERLAMBAT: Diubah dari 2.5 menjadi 5 detik
              ease: "linear",
              times: [0, 0.1, 0.8, 1], // Sinkronisasi timing perubahan opacity
            }}
            // Dibuat sangat besar agar sudut kapsul tidak bocor/terpotong saat diputar
            className="absolute top-1/2 left-1/2 aspect-square w-[400%] -translate-x-1/2 -translate-y-1/2"
            style={{
              // 80% transparan, 20% membentuk gradasi ekor cahaya
              background:
                "conic-gradient(from 0deg, transparent 80%, #ec4899 90%, #6366f1 100%)",
            }}
          />

          {/* Inner Content (Menutupi bagian tengah, menyisakan padding/border saja) */}
          <div className="relative z-10 flex items-center rounded-full bg-white/95 px-4 py-1.5 backdrop-blur-md">
            <span className="text-xs font-semibold text-indigo-700">
              ✦ Powered by Deep Learning · AI Karir #1 Indonesia
            </span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-4xl leading-tight font-extrabold tracking-tight text-slate-950 md:text-5xl"
        >
          Temukan Karir Impian
          <span className="block bg-linear-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
            yang Tepat Untukmu
          </span>
        </motion.h2>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-xl text-center text-lg text-slate-600"
        >
          CarPathMu menganalisis skill, minat, dan latar belakangmu untuk
          memberikan rekomendasi jalur yang personal, plus kursus & lowongan
          pekerjaan yang relevan.
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <Button
            className="group w-full rounded-2xl bg-indigo-600 px-10 py-7 text-lg font-bold text-white transition-all hover:bg-indigo-700 hover:text-white hover:shadow-xl hover:shadow-indigo-500/30 sm:w-auto"
            variant={"outline"}
          >
            Mulai Tes Gratis
            <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            className="w-full rounded-2xl px-10 py-7 text-lg font-semibold text-slate-900 transition-all hover:bg-white/80 sm:w-auto"
            variant={"outline"}
          >
            Pelajari Lebih Lanjut
          </Button>
        </motion.div>
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-linear-to-t from-indigo-50 to-transparent" />
    </div>
  );
}

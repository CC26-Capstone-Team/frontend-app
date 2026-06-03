"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveRight, Code2, LineChart, Target, Terminal } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  // === STATE UNTUK EFEK KETIKAN TERMINAL ===
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const terminalLines = [
    "Menganalisis skill dan minat...",
    "Memetakan jalur karir ideal...",
    "Mencari peluang yang relevan...",
  ];

  useEffect(() => {
    const ticker = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, typingSpeed]);

  const handleType = () => {
    const i = loopNum % terminalLines.length;
    const fullText = terminalLines[i];

    // Menentukan teks yang akan ditampilkan
    setText(
      isDeleting
        ? fullText.substring(0, text.length - 1) // Menghapus
        : fullText.substring(0, text.length + 1) // Mengetik
    );

    // Mengatur kecepatan (menghapus lebih cepat dari mengetik)
    setTypingSpeed(isDeleting ? 40 : 80);

    // Jika selesai mengetik satu kalimat
    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 1500); // Jeda sebelum menghapus
    }
    // Jika selesai menghapus satu kalimat
    else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1); // Pindah ke kalimat berikutnya
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] overflow-hidden bg-indigo-50">
      {/* --- LAYER AKSEN DENGAN ANIMASI CROSSING WAVE (BERLAWANAN) --- */}
      <motion.div
        animate={{
          x: ["0vw", "-60vw", "0vw"],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 -bottom-20 h-125 w-125 rounded-full bg-emerald-400/30 mix-blend-multiply blur-[120px]"
      />
      <motion.div
        animate={{
          x: ["0vw", "60vw", "0vw"],
          y: [0, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 h-125 w-125 rounded-full bg-fuchsia-400/30 mix-blend-multiply blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/20 mix-blend-multiply blur-[150px]"
      />

      {/* --- LAYER FLOATING ICONS (POIN 2) --- */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[10%] flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/40 shadow-sm backdrop-blur-md"
        >
          <Code2 className="h-6 w-6 text-indigo-500" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[30%] left-[15%] flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-white/40 shadow-sm backdrop-blur-md"
        >
          <LineChart className="h-5 w-5 text-emerald-500" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-[30%] right-[12%] flex h-16 w-16 items-center justify-center rounded-2xl border border-white/60 bg-white/40 shadow-sm backdrop-blur-md"
        >
          <Target className="h-7 w-7 text-fuchsia-500" />
        </motion.div>
      </div>

      {/* --- LAYER KONTEN UTAMA --- */}
      <section className="relative z-10 flex flex-col items-center gap-6 px-4 py-20">
        {/* === KOMPONEN BADGE === */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative max-w-min min-w-max overflow-hidden rounded-full bg-indigo-200/50 p-[1.5px] shadow-sm"
        >
          <motion.div
            animate={{ rotate: [0, 720], opacity: [0, 1, 1, 0] }}
            transition={{
              delay: 0.7,
              duration: 5,
              ease: "linear",
              times: [0, 0.1, 0.8, 1],
            }}
            className="absolute top-1/2 left-1/2 aspect-square w-[400%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 80%, #ec4899 90%, #6366f1 100%)",
            }}
          />
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
          className="mt-4 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6"
        >
          <Button
            className="group w-full rounded-2xl bg-indigo-600 px-10 py-7 text-lg font-bold text-white transition-all hover:bg-indigo-700 hover:text-white hover:shadow-xl hover:shadow-indigo-500/30 sm:w-auto"
            variant={"outline"}
            asChild
          >
            <Link href={"/register"}>
              Mulai Tes Gratis
              <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            className="w-full rounded-2xl border-slate-300 bg-white/50 px-10 py-7 text-lg font-semibold text-slate-900 backdrop-blur-sm transition-all hover:bg-white/80 sm:w-auto"
            variant={"outline"}
          >
            <Link href={'#steps'}>Pelajari Lebih Lanjut</Link>
          </Button>
        </motion.div>

        {/* === EFEK KETIKAN TERMINAL MURNI (TYPEWRITER EFFECT) === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex items-center gap-2 rounded-lg border border-slate-200/60 bg-white/50 px-4 py-2 font-mono text-sm text-slate-600 backdrop-blur-sm"
        >
          <Terminal className="h-4 w-4 text-indigo-600" />
          <span className="font-semibold text-indigo-700">&gt;</span>
          <span className="min-w-55 text-left sm:min-w-60">
            {text}
            {/* Kursor berkedip */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="ml-px inline-block h-4 w-1.5 bg-indigo-600 align-middle"
            />
          </span>
        </motion.div>
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-linear-to-t from-indigo-50 to-transparent" />
    </div>
  );
}

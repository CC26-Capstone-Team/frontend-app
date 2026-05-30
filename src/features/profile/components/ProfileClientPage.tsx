"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { AlertCircle, CheckCircle, Loader2, Mail, BookOpen, Shield, TrendingUp, Zap } from "lucide-react";
import { useUserProfile } from "../hooks/use-profile";
import { useAuth } from "@/providers/auth-provider";
import AvatarUpload from "./AvatarUpload";
import AcademicCard from "./AcademicCard";
import SkillsCard from "./SkillsCard";
import type { Skill } from "../types/profile.types";

// ─── Animation Variants ────────────────────────────────────────────────────
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Completeness helper ────────────────────────────────────────────────────
function getCompleteness(hasProfile: boolean, skillCount: number, hasAvatar: boolean) {
  let score = 0;
  if (hasProfile) score += 40;
  if (skillCount > 0) score += Math.min(skillCount, 5) * 10;
  if (hasAvatar) score += 10;
  return Math.min(score, 100);
}

// ─── Toast component ────────────────────────────────────────────────────────
function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`fixed right-5 top-20 z-[200] flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-2xl ${
        type === "success"
          ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-200"
          : "bg-gradient-to-r from-rose-500 to-red-500 shadow-rose-200"
      }`}
    >
      {type === "success"
        ? <CheckCircle className="h-4 w-4 shrink-0" />
        : <AlertCircle className="h-4 w-4 shrink-0" />}
      {message}
    </motion.div>
  );
}

// ─── Stats Bar ──────────────────────────────────────────────────────────────
function CompletionBar({ pct }: { pct: number }) {
  const color = pct < 40 ? "from-rose-400 to-orange-400"
    : pct < 70 ? "from-amber-400 to-yellow-400"
    : "from-emerald-400 to-teal-500";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">Kelengkapan Profil</span>
        <span className={`text-xs font-bold ${pct >= 70 ? "text-emerald-600" : pct >= 40 ? "text-amber-600" : "text-rose-500"}`}>{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
      {pct < 100 && (
        <p className="text-[11px] text-slate-400">
          {pct < 40 ? "Tambahkan profil akademik & skill untuk memulai 🚀"
            : pct < 70 ? "Tambahkan lebih banyak skill untuk rekomendasi terbaik ⚡"
            : "Profil hampir sempurna! Upload foto untuk melengkapi ✨"}
        </p>
      )}
    </div>
  );
}

// ─── Quick Stat Chip ────────────────────────────────────────────────────────
function StatChip({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 ${color}`}>
      <Icon className="h-4 w-4 shrink-0" />
      <div>
        <p className="text-[10px] font-medium opacity-70 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold leading-tight">{value}</p>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function ProfileClientPage() {
  const { data: profileData, isLoading, isError } = useUserProfile();
  const { user } = useAuth();

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const displayName = profileData?.username ?? user?.username ?? "Pengguna";
  const displayEmail = profileData?.email ?? user?.email ?? "";
  const avatarUrl = profileData?.avatar_url ?? null;
  const profile = profileData?.profile ?? null;
  const skills: Skill[] = profileData?.skills ?? [];
  const pct = getCompleteness(!!profile, skills.length, !!avatarUrl);

  // ── Loading ────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 opacity-20 blur-xl absolute inset-0" />
          <Loader2 className="relative h-10 w-10 animate-spin text-indigo-500" />
        </div>
        <p className="text-sm font-medium text-slate-400">Memuat profil Anda...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
        <AlertCircle className="h-10 w-10 text-rose-400" />
        <p className="font-medium text-slate-600">Gagal memuat profil.</p>
        <button onClick={() => window.location.reload()} className="text-sm text-indigo-500 underline underline-offset-2">Coba lagi</button>
      </div>
    );
  }

  return (
    <>
      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && <Toast key="toast" message={toast.message} type={toast.type} />}
      </AnimatePresence>

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl space-y-6 pb-10"
      >
        {/* ── Page Header ── */}
        <motion.div variants={cardVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Profil Saya
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Kelola informasi akun &amp; tingkatkan rekomendasimu
            </p>
          </div>
          {pct === 100 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-200"
            >
              <Shield className="h-3.5 w-3.5" />
              Profil Lengkap
            </motion.div>
          )}
        </motion.div>

        {/* ── Hero Identity Card ── */}
        <motion.div
          variants={cardVariants}
          className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/60 shadow-sm backdrop-blur-xl"
        >
          {/* Gradient background deco */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white/0 to-violet-50/60 pointer-events-none" />
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-violet-200/20 blur-3xl pointer-events-none" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              {/* Avatar */}
              <AvatarUpload
                avatarUrl={avatarUrl}
                displayName={displayName}
                onSuccess={(m) => showToast(m, "success")}
                onError={(m) => showToast(m, "error")}
              />

              {/* Info */}
              <div className="flex-1 space-y-4 text-center sm:text-left">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{displayName}</h2>
                  <p className="mt-0.5 flex items-center justify-center gap-1.5 text-sm text-slate-500 sm:justify-start">
                    <Mail className="h-3.5 w-3.5" />
                    {displayEmail}
                  </p>
                  {profile?.major && (
                    <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-medium text-indigo-600 sm:justify-start">
                      <BookOpen className="h-3.5 w-3.5" />
                      {profile.major} · {profile.education_level}
                    </p>
                  )}
                </div>

                {/* Quick stats */}
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  <StatChip icon={TrendingUp} label="IPK" value={profile?.gpa != null ? Number(profile.gpa).toFixed(2) : "—"} color="border-indigo-100 bg-indigo-50/80 text-indigo-700" />
                  <StatChip icon={Zap} label="Skill" value={`${skills.length} / 5`} color="border-violet-100 bg-violet-50/80 text-violet-700" />
                  <StatChip icon={Shield} label="Status" value={pct >= 70 ? "Siap Karir" : "Lengkapi Profil"} color={pct >= 70 ? "border-emerald-100 bg-emerald-50/80 text-emerald-700" : "border-amber-100 bg-amber-50/80 text-amber-700"} />
                </div>

                {/* Completion bar */}
                <CompletionBar pct={pct} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div variants={cardVariants}>
            <AcademicCard
              profile={profile}
              onSuccess={(m) => showToast(m, "success")}
              onError={(m) => showToast(m, "error")}
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <SkillsCard
              skills={skills}
              onSuccess={(m) => showToast(m, "success")}
              onError={(m) => showToast(m, "error")}
            />
          </motion.div>
        </div>

        {/* ── Info banner ── */}
        <motion.div
          variants={cardVariants}
          className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50/60 px-5 py-4"
        >
          <span className="mt-0.5 text-lg">💡</span>
          <div>
            <p className="text-sm font-semibold text-indigo-800">Tingkatkan akurasi rekomendasi</p>
            <p className="mt-0.5 text-xs text-indigo-600/80">
              Profil lengkap dengan skill relevan menghasilkan rekomendasi karir yang 3× lebih akurat dari AI kami.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

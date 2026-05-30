"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Edit3, Save, X, Loader2, User } from "lucide-react";
import { useCreateUserProfile, useUpdateUserProfile } from "../hooks/use-profile";
import type { UserProfile } from "../types/profile.types";

const EDUCATION_LEVELS = ["SMA/SMK", "D3", "D4", "S1", "S2", "S3"];

interface AcademicCardProps {
  profile: UserProfile | null;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export default function AcademicCard({ profile, onSuccess, onError }: AcademicCardProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ education_level: "", major: "", gpa: "" });
  const createProfile = useCreateUserProfile();
  const updateProfile = useUpdateUserProfile();
  const isSaving = createProfile.isPending || updateProfile.isPending;

  const startEdit = () => {
    setForm({
      education_level: profile?.education_level ?? "",
      major: profile?.major ?? "",
      gpa: profile?.gpa != null ? String(profile.gpa) : "",
    });
    setEditing(true);
  };

  const handleSave = async () => {
    const payload = {
      education_level: form.education_level,
      major: form.major,
      gpa: form.gpa ? parseFloat(form.gpa) : undefined,
    };
    try {
      if (!profile) {
        await createProfile.mutateAsync(payload as Parameters<typeof createProfile.mutateAsync>[0]);
        onSuccess("Profil akademik berhasil dibuat! 🎓");
      } else {
        await updateProfile.mutateAsync(payload);
        onSuccess("Profil akademik diperbarui! ✅");
      }
      setEditing(false);
    } catch {
      onError("Gagal menyimpan. Periksa input Anda.");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-sm backdrop-blur-xl transition-shadow hover:shadow-md">
      {/* Decorative */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-100/50 blur-2xl" />

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm">
            <GraduationCap className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Profil Akademik</h2>
            <p className="text-[11px] text-slate-400">Pendidikan &amp; IPK</p>
          </div>
        </div>
        {!editing && (
          <motion.button
            id="btn-edit-profile"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startEdit}
            className="flex items-center gap-1.5 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
          >
            <Edit3 className="h-3 w-3" />
            {profile ? "Edit" : "Tambah"}
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!editing ? (
          <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {profile ? (
              <dl className="space-y-3">
                {[
                  { label: "Jenjang", value: profile.education_level },
                  { label: "Jurusan", value: profile.major },
                  { label: "IPK", value: profile.gpa != null ? `${Number(profile.gpa).toFixed(2)} / 4.00` : "—" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl bg-slate-50/70 px-4 py-2.5">
                    <dt className="text-xs font-medium text-slate-400">{item.label}</dt>
                    <dd className="text-sm font-semibold text-slate-700">{item.value || "—"}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <User className="h-6 w-6 text-slate-300" />
                </div>
                <p className="text-sm text-slate-400">Belum ada profil akademik</p>
                <button onClick={startEdit} className="text-xs font-semibold text-indigo-500 underline-offset-2 hover:underline">Tambah sekarang →</button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div key="edit" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
            <div>
              <label htmlFor="education_level" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Jenjang</label>
              <select id="education_level" value={form.education_level} onChange={(e) => setForm(p => ({ ...p, education_level: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                <option value="">Pilih jenjang...</option>
                {EDUCATION_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="major" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Jurusan</label>
              <input id="major" type="text" placeholder="cth. Teknik Informatika" value={form.major}
                onChange={(e) => setForm(p => ({ ...p, major: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
            </div>
            <div>
              <label htmlFor="gpa" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">IPK <span className="normal-case font-normal text-slate-300">(opsional)</span></label>
              <input id="gpa" type="number" min="0" max="4" step="0.01" placeholder="3.75" value={form.gpa}
                onChange={(e) => setForm(p => ({ ...p, gpa: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
            </div>
            <div className="flex gap-2 pt-1">
              <button id="btn-save-profile" onClick={handleSave} disabled={isSaving}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
              <button id="btn-cancel-profile" onClick={() => setEditing(false)} disabled={isSaving}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50">
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

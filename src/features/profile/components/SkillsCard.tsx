"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Edit3, Save, X, Loader2, Award } from "lucide-react";
import { useUpdateUserSkills, useAllSkills } from "../hooks/use-profile";
import type { Skill } from "../types/profile.types";

interface SkillsCardProps {
  skills: Skill[];
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SKILL_COLORS = [
  "bg-indigo-50 text-indigo-700 ring-indigo-100",
  "bg-violet-50 text-violet-700 ring-violet-100",
  "bg-sky-50 text-sky-700 ring-sky-100",
  "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "bg-rose-50 text-rose-700 ring-rose-100",
];

export default function SkillsCard({ skills, onSuccess, onError }: SkillsCardProps) {
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { data: allSkills } = useAllSkills();
  const updateSkills = useUpdateUserSkills();
  const isSaving = updateSkills.isPending;

  const startEdit = () => {
    setSelected(skills.map((s) => s.id));
    setEditing(true);
  };

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 5) { onError("Maksimal 5 skill."); return prev; }
      return [...prev, id];
    });
  };

  const handleSave = async () => {
    if (selected.length === 0) { onError("Pilih minimal 1 skill."); return; }
    try {
      await updateSkills.mutateAsync({ skill_ids: selected });
      onSuccess("Skill berhasil diperbarui! ⚡");
      setEditing(false);
    } catch {
      onError("Gagal memperbarui skill.");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-sm backdrop-blur-xl transition-shadow hover:shadow-md">
      <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-violet-100/50 blur-2xl" />

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-sm">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Keahlian</h2>
            <p className="text-[11px] text-slate-400">{skills.length} dari 5 skill dipilih</p>
          </div>
        </div>
        {!editing && (
          <motion.button
            id="btn-edit-skills"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startEdit}
            className="flex items-center gap-1.5 rounded-xl border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
          >
            <Edit3 className="h-3 w-3" />
            Edit
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!editing ? (
          <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Award className="h-6 w-6 text-slate-300" />
                </div>
                <p className="text-sm text-slate-400">Belum ada skill terpilih</p>
                <button onClick={startEdit} className="text-xs font-semibold text-violet-500 underline-offset-2 hover:underline">Tambah skill →</button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div key="edit" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">Pilih hingga <span className="font-bold text-violet-600">5 skill</span></p>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${selected.length >= 5 ? "bg-rose-50 text-rose-600" : "bg-violet-50 text-violet-600"}`}>
                {selected.length}/5
              </span>
            </div>

            <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <div className="flex flex-wrap gap-2">
                {allSkills?.map((skill) => {
                  const isSelected = selected.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      id={`skill-${skill.id}`}
                      onClick={() => toggle(skill.id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                        isSelected
                          ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-sm shadow-violet-200"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-600"
                      }`}
                    >
                      {isSelected && "✓ "}{skill.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2">
              <button id="btn-save-skills" onClick={handleSave} disabled={isSaving}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isSaving ? "Menyimpan..." : "Simpan Skill"}
              </button>
              <button id="btn-cancel-skills" onClick={() => setEditing(false)} disabled={isSaving}
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

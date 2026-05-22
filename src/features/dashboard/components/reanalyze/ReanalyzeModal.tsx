"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SkillBadge from "./SkillBadge";
import {
  useSkills,
  useUpdateSkill,
  useUserSkill,
} from "../../hooks/use-dashboard";
import { toast } from "sonner";

interface ReanalyzeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReanalyzeModal({
  isOpen,
  onClose,
  onSuccess,
}: ReanalyzeModalProps) {
  const { data: dbSkills, isLoading: isFetchingSkills } = useSkills();
  const { data: userSkill } = useUserSkill();
  const { mutate: skillMutation, isPending } = useUpdateSkill();

  const [selected, setSelected] = useState<string[]>([]);
  const [prevIsOpen, setPrevIsOpen] = useState(false);

  if (isOpen && !prevIsOpen && userSkill) {
    setSelected(userSkill.map((s) => s.id));
    setPrevIsOpen(true);
  } else if (!isOpen && prevIsOpen) {
    setPrevIsOpen(false);
  }

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (skillIds: string[]) => {
    try {
      skillMutation(skillIds, {
        onSuccess: () => {
          toast.success("Skill berhasil diperbarui");
        },
        onError: (error) => {
          toast.error("Gagal memperbarui skill");
          console.error(error);
        },
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Gagal mengupdate skill", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Masking */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isPending ? onClose : undefined}
            className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-2xl shadow-indigo-200/50 backdrop-blur-2xl"
            >
              {/* Header */}
              <div className="flex shrink-0 items-start justify-between border-b border-indigo-100/50 bg-white/50 px-6 py-5">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Sesuaikan Keahlian
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Pilih keahlian yang Anda miliki untuk analisis karir yang
                    lebih akurat.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  disabled={isPending}
                  className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body (Scrollable) */}
              <div className="scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent flex-1 overflow-y-auto p-6">
                {isFetchingSkills ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <Loader2 className="mb-4 h-8 w-8 animate-spin text-indigo-500" />
                    <p className="text-sm">Memuat daftar keahlian...</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {dbSkills?.map((skill) => (
                      <SkillBadge
                        key={skill.id}
                        id={skill.id}
                        name={skill.name}
                        isSelected={selected.includes(skill.id)}
                        onToggle={toggle}
                        disabled={isPending}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex shrink-0 items-center justify-end gap-3 border-t border-indigo-100/50 bg-indigo-50/30 px-6 py-5">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  disabled={isPending}
                  className="rounded-xl font-semibold text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
                >
                  Batal
                </Button>
                <Button
                  onClick={() => handleSubmit(selected)}
                  disabled={isPending || selected.length === 0}
                  className={cn(
                    "relative overflow-hidden rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-600 px-6 font-bold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30",
                    isPending || selected.length === 0
                      ? "cursor-not-allowed opacity-90"
                      : ""
                  )}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menganalisis...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Simpan & Analisis Ulang
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useSkills,
  useUpdateSkill,
  useUserSkill,
} from "../../hooks/use-dashboard";
import { toast } from "sonner";

// IMPOR SHADCN TOOLTIP
import { TooltipProvider } from "@/components/ui/tooltip";
import SkillSelected from "./SkillSelected";
import SkillSearch from "./SkillSearch";

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
  const [searchSkill, setSearchSkill] = useState("");

  if (isOpen && !prevIsOpen && userSkill) {
    setSelected(userSkill.map((s) => s.id));
    setPrevIsOpen(true);
  } else if (!isOpen && prevIsOpen) {
    setPrevIsOpen(false);
  }

  const toggle = (id: string) => {
    setSelected((prev) => {
      const isCurrentlySelected = prev.includes(id);

      if (isCurrentlySelected) {
        return prev.filter((s) => s !== id);
      } else {
        if (prev.length >= 5) {
          toast.error("Maksimal 5 keahlian yang dapat dipilih.");
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  // 1. Data untuk Section Atas: Skill yang SUDAH dipilih
  const selectedSkillsData = useMemo(() => {
    if (!dbSkills) return [];
    return dbSkills.filter((skill) => selected.includes(skill.id));
  }, [dbSkills, selected]);

  // 2. Data untuk Section Bawah: Skill yang BELUM dipilih + Filter Pencarian
  const availableSkillsData = useMemo(() => {
    if (!dbSkills) return [];
    return dbSkills.filter(
      (skill) =>
        !selected.includes(skill.id) &&
        skill.name.toLowerCase().includes(searchSkill.toLowerCase())
    );
  }, [dbSkills, searchSkill, selected]);

  const handleSubmit = async (skillIds: string[]) => {
    try {
      skillMutation(skillIds, {
        onSuccess: () => {
          toast.success("Skill berhasil diperbarui");
          onSuccess();
        },
        onError: (error) => {
          toast.error("Gagal memperbarui skill");
          console.error(error);
        },
      });

      onClose();
    } catch (error) {
      console.error("Gagal mengupdate skill", error);
    }
  };

  const isSubmitDisabled = isPending || selected.length < 2;

  return (
    <AnimatePresence>
      {isOpen && (
        <TooltipProvider delayDuration={300}>
          {/* Backdrop Masking */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isPending ? onClose : undefined}
            className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm"
          />

          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/80 shadow-2xl shadow-indigo-200/50 backdrop-blur-2xl"
            >
              {/* HEADER */}
              <div className="flex shrink-0 items-start justify-between border-b border-indigo-100/50 bg-white/50 px-6 py-5">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Sesuaikan Keahlian
                    </h3>
                    <button
                      onClick={onClose}
                      disabled={isPending}
                      className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    Pilih minimal 2 dan maksimal 5 keahlian untuk analisis karir
                    yang lebih akurat.
                  </p>
                </div>
              </div>

              {/* SECTION 1: WADAH SKILL YANG DIPILIH */}
              <SkillSelected
                skill={selected}
                selectedSkillsData={selectedSkillsData}
                toggle={toggle}
                isPending={isPending}
              />

              {/* SECTION 2: PENCARIAN & DAFTAR TERSEDIA */}
              <SkillSearch
                searchSkill={searchSkill}
                setSearchSkill={setSearchSkill}
              />

              <div className="scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent flex-1 overflow-y-auto bg-slate-50/30 p-6">
                {isFetchingSkills ? (
                  <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                    <Loader2 className="mb-4 h-8 w-8 animate-spin text-indigo-500" />
                    <p className="text-sm">Memuat daftar keahlian...</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {availableSkillsData.length > 0 ? (
                      availableSkillsData.map((skill) => (
                        <button
                          key={skill.id}
                          onClick={() => toggle(skill.id)}
                          disabled={isPending || selected.length >= 5}
                          className={cn(
                            "flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
                          )}
                        >
                          <Plus className="h-3.5 w-3.5" />
                          {skill.name}
                        </button>
                      ))
                    ) : (
                      <p className="w-full py-4 text-center text-sm text-slate-400">
                        {searchSkill
                          ? "Keahlian tidak ditemukan."
                          : "Semua keahlian telah dipilih."}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* FOOTER */}
              <div className="flex shrink-0 items-center justify-between border-t border-indigo-100/50 bg-white/50 px-6 py-5">
                <div className="text-xs text-slate-500">
                  {selected.length === 5 && (
                    <span className="font-medium text-indigo-600">
                      Batas maksimal tercapai.
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
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
                    disabled={isSubmitDisabled}
                    className={cn(
                      "relative overflow-hidden rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-600 px-6 font-bold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30",
                      isSubmitDisabled ? "cursor-not-allowed opacity-90" : ""
                    )}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Simpan & Analisis
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </TooltipProvider>
      )}
    </AnimatePresence>
  );
}

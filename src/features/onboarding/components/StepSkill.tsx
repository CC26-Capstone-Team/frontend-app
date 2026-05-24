"use client";

import { useState, useMemo } from "react";
import { useSkills } from "../hooks/use-onboarding";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Sparkles, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// IMPOR SHADCN TOOLTIP
import { TooltipProvider } from "@/components/ui/tooltip";
import SkillSelected from "./SkillSelected";
import SkillSearch from "./SkillSearch";

type Props = {
  selectedSkills: string[];
  onBack: () => void;
  onSubmit: (skillIds: string[]) => void;
  isPending: boolean;
};

export default function StepSkills({
  selectedSkills,
  onBack,
  onSubmit,
  isPending,
}: Props) {
  const [selected, setSelected] = useState<string[]>(selectedSkills);
  const [searchSkill, setSearchSkill] = useState("");
  const { data: skills, isLoading } = useSkills();

  // LOGIKA: Batasi maksimal 5 skill
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
    if (!skills) return [];
    return skills.filter((skill) => selected.includes(skill.id));
  }, [skills, selected]);

  // 2. Data untuk Section Bawah: Skill yang BELUM dipilih + Filter Pencarian
  const availableSkillsData = useMemo(() => {
    if (!skills) return [];
    return skills.filter(
      (skill) =>
        !selected.includes(skill.id) &&
        skill.name.toLowerCase().includes(searchSkill.toLowerCase())
    );
  }, [skills, searchSkill, selected]);

  // Validasi: minimal 2 skill untuk bisa lanjut
  const isSubmitDisabled = isPending || selected.length < 2;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        {/* SEKSI HEADER & COUNTER */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-extrabold text-slate-900">
            Pilih Keahlian Utama Anda
          </h3>
          <p className="text-sm text-slate-500">
            Pilih minimal 2 dan maksimal 5 keahlian untuk mempersonalisasi jalur
            karier Anda.
          </p>
        </div>

        {/* SECTION 1: WADAH SKILL YANG DIPILIH (KERANJANG) */}
        <SkillSelected
          selected={selected}
          selectedSkillsData={selectedSkillsData}
          toggle={toggle}
          isPending={isPending}
        />

        {/* SECTION 2: PENCARIAN & DAFTAR TERSEDIA */}

        <div className="space-y-4">
          <SkillSearch
            searchSkill={searchSkill}
            setSearchSkill={setSearchSkill}
          />

          <div className="scrollbar-thin scrollbar-thumb-indigo-200 h-55 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
            {isLoading ? (
              <div className="flex h-full flex-col items-center justify-center text-slate-400">
                <Loader2 className="mb-4 h-8 w-8 animate-spin text-indigo-500" />
                <p className="text-sm">Menyiapkan daftar keahlian...</p>
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
                  <div className="flex w-full items-center justify-center py-8 text-sm text-slate-400">
                    {searchSkill
                      ? "Keahlian tidak ditemukan."
                      : "Semua keahlian telah dipilih."}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SEKSI NAVIGATION BUTTONS */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isPending}
            className="rounded-2xl border-slate-200 bg-white/50 px-5 py-6 text-slate-600 transition-all hover:bg-white hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <Button
            onClick={() => onSubmit(selected)}
            disabled={isSubmitDisabled}
            className={cn(
              "group flex-1 rounded-2xl py-6 text-base font-bold text-white shadow-xl transition-all",
              isSubmitDisabled
                ? "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none"
                : "bg-indigo-600 shadow-indigo-500/20 hover:-translate-y-0.5 hover:bg-indigo-700"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses Data...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                Selesai & Analisis Profil
              </>
            )}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}

"use client";

import { useState } from "react";
import { useSkills } from "../hooks/use-onboarding";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Loader2, Sparkles } from "lucide-react";

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
  const { data: skills, isLoading } = useSkills();

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <Loader2 className="mb-4 h-8 w-8 animate-spin text-indigo-500" />
            <p className="text-sm">Menyiapkan daftar keahlian...</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-2">
            {skills?.map((skill) => {
              const isSelected = selected.includes(skill.id);
              return (
                <button
                  key={skill.id}
                  onClick={() => toggle(skill.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                      : "border-slate-200 bg-white/50 text-slate-600 hover:border-slate-300 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                  {skill.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isPending}
          className="rounded-xl border-slate-200 bg-white/50 px-5 py-6 text-slate-600 hover:bg-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>

        <Button
          onClick={() => onSubmit(selected)}
          disabled={isPending || selected.length === 0}
          className="flex-1 rounded-xl bg-indigo-600 py-6 text-base text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses Data...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Selesai & Analisis Profil
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

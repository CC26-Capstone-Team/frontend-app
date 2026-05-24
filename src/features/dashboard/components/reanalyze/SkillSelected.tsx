import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SkillSelectedProps } from "../../types/dashboard.types";

export default function SkillSelected({
  skill,
  selectedSkillsData,
  toggle,
  isPending,
}: SkillSelectedProps) {
  return (
    <div className="bg-indigo-50/40 px-6 py-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold tracking-wider text-indigo-900/50 uppercase">
          Keahlian Terpilih
        </span>
        <span
          className={cn(
            "text-xs font-bold",
            skill.length >= 2 && skill.length <= 5
              ? "text-indigo-600"
              : "text-amber-600"
          )}
        >
          {skill.length} / 5
        </span>
      </div>

      <div className="flex min-h-11 flex-wrap gap-2 rounded-xl border border-indigo-100/60 bg-white/60 p-2 shadow-inner">
        <AnimatePresence mode="popLayout">
          {selectedSkillsData.length > 0 ? (
            selectedSkillsData.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                key={skill.id}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => toggle(skill.id)}
                      disabled={isPending}
                      className="group flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-rose-500 disabled:opacity-50"
                    >
                      {skill.name}
                      <X className="h-4 w-4 text-indigo-200 transition-colors group-hover:text-white" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="border border-slate-200 bg-white text-xs text-slate-900 shadow-sm"
                  >
                    <p>Hapus {skill.name}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))
          ) : (
            <div className="flex w-full items-center justify-center p-2 text-sm text-slate-400">
              Belum ada keahlian yang dipilih.
            </div>
          )}
        </AnimatePresence>
      </div>
      {skill.length < 2 && (
        <p className="mt-2 text-xs font-medium text-amber-600">
          * Silakan pilih {2 - skill.length} keahlian lagi.
        </p>
      )}
    </div>
  );
}

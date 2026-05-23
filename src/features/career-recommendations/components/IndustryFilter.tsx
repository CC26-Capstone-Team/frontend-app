"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

interface IndustryFilterProps {
  industries: string[];
  selected: string | null;
  onSelect: (industry: string | null) => void;
}

export default function IndustryFilter({
  industries,
  selected,
  onSelect,
}: IndustryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <Filter className="h-4 w-4 shrink-0 text-slate-400" />

      <button
        onClick={() => onSelect(null)}
        className={cn(
          "shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
          selected === null
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
            : "border border-white/80 bg-white/60 text-slate-600 hover:bg-white/80"
        )}
      >
        Semua
      </button>

      {industries.map((industry) => (
        <motion.button
          key={industry}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(industry === selected ? null : industry)}
          className={cn(
            "shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
            selected === industry
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "border border-white/80 bg-white/60 text-slate-600 hover:bg-white/80"
          )}
        >
          {industry}
        </motion.button>
      ))}
    </div>
  );
}

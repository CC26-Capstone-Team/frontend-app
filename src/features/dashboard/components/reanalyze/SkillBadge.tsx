import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { SkillBadgeProps } from "../../types/dashboard.types";


export default function SkillBadge({
  id,
  name,
  isSelected,
  onToggle,
  disabled,
}: SkillBadgeProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      disabled={disabled}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 disabled:opacity-50",
        isSelected
          ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
          : "border-slate-200 bg-white/50 text-slate-600 hover:border-slate-300 hover:bg-white hover:shadow-sm"
      )}
    >
      {isSelected && <Check className="h-3.5 w-3.5" />}
      {name}
    </button>
  );
}

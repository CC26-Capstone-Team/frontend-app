import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { SkillSearchProps } from "../types/onboarding.types";

export default function SkillSearch({
  searchSkill,
  setSearchSkill,
}: SkillSearchProps) {
  return (
    <div className="group relative">
      <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
      <Input
        type="text"
        placeholder="Cari keahlian untuk ditambahkan (contoh: React, SQL)..."
        value={searchSkill}
        onChange={(e) => setSearchSkill(e.target.value)}
        className="h-12 w-full rounded-2xl border-slate-200 bg-white/50 pr-10 pl-12 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100/50"
      />
      {searchSkill && (
        <button
          onClick={() => setSearchSkill("")}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

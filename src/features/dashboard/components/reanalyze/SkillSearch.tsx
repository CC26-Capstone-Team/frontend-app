import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { SkillSearchProps } from "../../types/dashboard.types";

export default function SkillSearch({searchSkill, setSearchSkill}: SkillSearchProps) {
  return (
    <div className="border-t border-b border-indigo-100/50 bg-white px-6 py-3">
      <div className="group relative">
        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
        <Input
          type="text"
          placeholder="Cari keahlian untuk ditambahkan..."
          value={searchSkill}
          onChange={(e) => setSearchSkill(e.target.value)}
          className="h-11 w-full rounded-xl border-slate-200 bg-slate-50/50 pr-10 pl-11 text-slate-900 transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100/50"
        />
        {searchSkill && (
          <button
            onClick={() => setSearchSkill("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

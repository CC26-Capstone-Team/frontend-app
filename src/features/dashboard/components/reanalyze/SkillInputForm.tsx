import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkillInputFormProps } from "../../types/dashboard.types";


export default function SkillInputForm({
  onAdd,
  disabled,
}: SkillInputFormProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      onAdd(trimmed);
      setInputValue(""); // Reset input setelah berhasil ditambahkan
    }
  };

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
        Tambah Keahlian Baru
      </label>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Contoh: Next.js, Python, Figma..."
          disabled={disabled}
          className="flex-1 rounded-xl border border-indigo-100 bg-white/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
        />
        <Button
          type="submit"
          disabled={!inputValue.trim() || disabled}
          className="rounded-xl bg-indigo-600 px-4 transition-all hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/30"
        >
          <Plus className="h-5 w-5 text-white" />
        </Button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { OnboardingPayload } from "../types/onboarding.types";
import { academicSchema } from "../types/onboarding.schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useEducationMetadata } from "../hooks/use-onboarding";

// --- KAMUS TERJEMAHAN ---
const educationTranslation: Record<string, string> = {
  "High School": "SMA / SMK Sederajat",
  "Associate": "Diploma (D1 - D4)",
  "Bootcamp": "Bootcamp / Pelatihan Intensif",
  "Bachelor's": "Sarjana (S1)",
  "Master's": "Magister (S2)",
  "PhD": "Doktor (S3)",
};

const majorTranslation: Record<string, string> = {
  "Administration": "Administrasi",
  "Communication Science": "Ilmu Komunikasi",
  "Computer Science": "Ilmu Komputer",
  "Electrical Engineering": "Teknik Elektro",
  "Industrial Engineering": "Teknik Industri",
  "Informatics Engineering": "Teknik Informatika",
  "Information Systems": "Sistem Informasi",
  "Law": "Ilmu Hukum",
  "Management": "Manajemen",
  "Mathematics": "Matematika",
  "Mechanical Engineering": "Teknik Mesin",
  "Psychology": "Psikologi",
  "Statistics": "Statistika",
};

type Props = {
  defaultValues: Omit<OnboardingPayload, "skill_ids">;
  onNext: (data: Omit<OnboardingPayload, "skill_ids">) => void;
};

export default function StepAcademic({ defaultValues, onNext }: Props) {
  const [educationLevel, setEducationLevel] = useState(
    defaultValues.education_level
  );
  const [major, setMajor] = useState(defaultValues.major);
  const [gpa, setGpa] = useState<number | string>(defaultValues.gpa || "");

  const [errors, setErrors] = useState<
    Partial<Record<"education_level" | "major" | "gpa", string>>
  >({});

  const { data: metadata, isLoading, isError } = useEducationMetadata();

  const handleNext = () => {
    const parsedGpa = typeof gpa === "string" ? parseFloat(gpa) : gpa;

    const result = academicSchema.safeParse({
      education_level: educationLevel,
      major,
      gpa: parsedGpa,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        education_level: fieldErrors.education_level?.[0],
        major: fieldErrors.major?.[0],
        gpa: fieldErrors.gpa?.[0],
      });
      return;
    }

    setErrors({});
    onNext({ education_level: educationLevel, major, gpa: parsedGpa || 0 });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <p className="text-sm font-medium text-slate-500">
          Menyiapkan formulir akademik...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-2 text-center text-rose-500">
        <AlertCircle className="h-8 w-8" />
        <p className="text-sm font-medium">Gagal memuat data master.</p>
        <p className="text-xs text-rose-400">Silakan muat ulang halaman.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Jenjang Pendidikan */}
      <div className="space-y-2">
        <Label
          htmlFor="education"
          className={errors.education_level ? "text-rose-500" : ""}
        >
          Jenjang Pendidikan Terakhir
        </Label>
        <Select value={educationLevel} onValueChange={setEducationLevel}>
          <SelectTrigger
            id="education"
            className={`bg-white/50 ${errors.education_level ? "border-rose-500" : ""}`}
          >
            {/* Tampilkan placeholder atau terjemahan jika sudah ada value yang terpilih */}
            <SelectValue placeholder="Pilih jenjang...">
              {educationLevel ? educationTranslation[educationLevel] : ""}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {metadata?.education_levels.map((level) => (
              <SelectItem key={level} value={level}>
                {/* Fallback ke teks asli jika terjemahan tidak ditemukan */}
                {educationTranslation[level] || level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.education_level && (
          <p className="flex items-center text-xs font-medium text-rose-500">
            <AlertCircle className="mr-1 h-3 w-3" />
            {errors.education_level}
          </p>
        )}
      </div>

      {/* Program Studi / Jurusan */}
      <div className="space-y-2">
        <Label htmlFor="major" className={errors.major ? "text-rose-500" : ""}>
          Program Studi / Jurusan
        </Label>
        <Select value={major} onValueChange={setMajor}>
          <SelectTrigger
            id="major"
            className={`bg-white/50 ${errors.major ? "border-rose-500" : ""}`}
          >
            <SelectValue placeholder="Pilih jurusan...">
              {major ? majorTranslation[major] : ""}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {metadata?.majors.map((m) => (
              <SelectItem key={m} value={m}>
                {majorTranslation[m] || m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.major && (
          <p className="flex items-center text-xs font-medium text-rose-500">
            <AlertCircle className="mr-1 h-3 w-3" />
            {errors.major}
          </p>
        )}
      </div>

      {/* GPA / IPK */}
      <div className="space-y-2">
        <Label htmlFor="gpa" className={errors.gpa ? "text-rose-500" : ""}>
          IPK / Nilai Rata-rata
        </Label>
        <Input
          id="gpa"
          type="number"
          min={0}
          max={4}
          step={0.01}
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          placeholder="Contoh: 3.85"
          className={`bg-white/50 ${errors.gpa ? "border-rose-500" : ""}`}
        />
        {errors.gpa && (
          <p className="flex items-center text-xs font-medium text-rose-500">
            <AlertCircle className="mr-1 h-3 w-3" />
            {errors.gpa}
          </p>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <Button
          onClick={handleNext}
          className="group w-full rounded-xl bg-indigo-600 py-6 text-base text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700"
        >
          Lanjutkan
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
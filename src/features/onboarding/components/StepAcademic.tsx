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
import { ArrowRight, AlertCircle } from "lucide-react";

type Props = {
  defaultValues: Omit<OnboardingPayload, "skill_ids">;
  onNext: (data: Omit<OnboardingPayload, "skill_ids">) => void;
};

export default function StepAcademic({ defaultValues, onNext }: Props) {
  const [educationLevel, setEducationLevel] = useState(
    defaultValues.education_level
  );
  const [major, setMajor] = useState(defaultValues.major);
  const [gpa, setGpa] = useState<number | string>(defaultValues.gpa || ""); // Izinkan string sementara agar input number tidak error

  const [errors, setErrors] = useState<
    Partial<Record<"education_level" | "major" | "gpa", string>>
  >({});

  const handleNext = () => {
    // Parsing manual untuk memastikan tipe gpa adalah number saat diuji Zod
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

    // Clear errors & lanjut
    setErrors({});
    onNext({ education_level: educationLevel, major, gpa: parsedGpa || 0 });
  };

  return (
    <div className="space-y-6">
      {/* Field: Jenjang Pendidikan */}
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
            <SelectValue placeholder="Pilih jenjang..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SMA">SMA / SMK Sederajat</SelectItem>
            <SelectItem value="D3">Diploma 3 (D3)</SelectItem>
            <SelectItem value="S1">Strata 1 (S1)</SelectItem>
            <SelectItem value="S2">Strata 2 (S2)</SelectItem>
          </SelectContent>
        </Select>
        {errors.education_level && (
          <p className="flex items-center text-xs font-medium text-rose-500">
            <AlertCircle className="mr-1 h-3 w-3" />
            {errors.education_level}
          </p>
        )}
      </div>

      {/* Field: Jurusan */}
      <div className="space-y-2">
        <Label htmlFor="major" className={errors.major ? "text-rose-500" : ""}>
          Program Studi / Jurusan
        </Label>
        <Input
          id="major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder="Contoh: Teknik Informatika"
          className={`bg-white/50 ${errors.major ? "border-rose-500" : ""}`}
        />
        {errors.major && (
          <p className="flex items-center text-xs font-medium text-rose-500">
            <AlertCircle className="mr-1 h-3 w-3" />
            {errors.major}
          </p>
        )}
      </div>

      {/* Field: GPA / IPK */}
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

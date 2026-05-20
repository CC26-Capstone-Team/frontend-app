"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingPayload } from "../types/onboarding.types";
import { useSubmitOnboarding } from "../hooks/use-onboarding";
import StepAcademic from "./StepAcademic";
import StepSkills from "./StepSkill";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const initialFormData: OnboardingPayload = {
  education_level: "",
  major: "",
  gpa: 0,
  skill_ids: [],
};

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingPayload>(initialFormData);
  const { mutate, isPending } = useSubmitOnboarding();

  const router = useRouter();

  const handleNextStep = (data: Omit<OnboardingPayload, "skill_ids">) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleSubmit = (skillIds: string[]) => {
    mutate(
      { ...formData, skill_ids: skillIds },
      {
        onSuccess: () => {
          setCookie("is_onboarded", "true");
          toast.success("Profil Berhasil Disimpan!", {
            description:
              "Mesin AI kami sedang memetakan jalur karir terbaik untukmu.",
          });
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        },
        onError: (error) => {
          toast.error("Gagal Menyimpan Data", {
            description:
              "Terjadi kesalahan pada sistem. Silakan coba beberapa saat lagi.",
          });
          console.error(error);
        },
      }
    );
  };

  // Varian animasi untuk transisi antar step
  const stepVariants = {
    hidden: { opacity: 0, x: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      x: -20,
      filter: "blur(4px)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-4">
      {/* Background Blobs AI */}
      <div className="absolute top-[-10%] left-[-10%] h-125 w-125 rounded-full bg-indigo-300/30 blur-[100px]" />
      <div className="absolute right-[-10%] bottom-[-10%] h-125 w-125 rounded-full bg-emerald-300/30 blur-[100px]" />

      <div className="relative z-10 w-full max-w-xl">
        {/* Header Progress Sederhana */}
        <div className="mb-8 flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <span className="text-xl font-black text-indigo-600">{step}</span>
            <span className="text-slate-400">/2</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {step === 1 ? "Profil Akademik" : "Keahlian Spesifik"}
          </h1>
          <p className="text-sm text-slate-500">
            Bantu AI kami memahami latar belakangmu untuk hasil yang akurat.
          </p>
        </div>

        {/* Kontainer Form Glassmorphism */}
        <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-6 shadow-xl backdrop-blur-xl md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {step === 1 && (
                <StepAcademic
                  defaultValues={formData}
                  onNext={handleNextStep}
                />
              )}
              {step === 2 && (
                <StepSkills
                  selectedSkills={formData.skill_ids}
                  onBack={() => setStep(1)}
                  onSubmit={handleSubmit}
                  isPending={isPending}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

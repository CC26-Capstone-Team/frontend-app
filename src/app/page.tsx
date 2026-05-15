"use client";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import Step from "@/features/home/components/Steps";
import Features from "@/features/home/components/Feature";
import CtaSection from "@/features/home/components/CtaSection";
import ProblemSolution from "@/features/home/components/ProblemSolution";
import Testimonials from "@/features/home/components/Testimonials";
import HeroSection from "@/features/home/components/HeroSection";

export default function Page() {
  return (
    <div className="relative overflow-hidden bg-indigo-50 pb-24">
      {/* --- LAYER HERO SECTION ---   */}
      <HeroSection />

      {/* --- LAYER MASALAH & SOLUSI ---  */}
      <ProblemSolution />

      {/* --- LAYER LANGKAH-LANGKAH ---  */}
      <Step />

      {/* --- LAYER FITUR---  */}
      <Features />

      {/* --- LAYER TESTIMONIAL ---  */}
      <Testimonials />

      {/* --- LAYER CTASECTION ---  */}
      <CtaSection />
    </div>
  );
}

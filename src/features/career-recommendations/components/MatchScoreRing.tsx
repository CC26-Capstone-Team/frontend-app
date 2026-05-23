"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MatchScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function getScoreColor(score: number) {
  if (score >= 85)
    return {
      stroke: "stroke-indigo-500",
      text: "text-indigo-600",
      glow: "drop-shadow-[0_0_8px_rgba(99,102,241,0.35)]",
    };
  if (score >= 70)
    return {
      stroke: "stroke-emerald-500",
      text: "text-emerald-600",
      glow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.35)]",
    };
  return {
    stroke: "stroke-amber-500",
    text: "text-amber-600",
    glow: "drop-shadow-[0_0_8px_rgba(245,158,11,0.35)]",
  };
}

export default function MatchScoreRing({
  score,
  size = 96,
  strokeWidth = 7,
  className,
}: MatchScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const colors = getScoreColor(score);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg width={size} height={size} className={cn("-rotate-90", colors.glow)}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-slate-100"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={colors.stroke}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={cn("text-xl font-extrabold leading-none", colors.text)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {score}%
        </motion.span>
        <span className="mt-0.5 text-[9px] font-medium text-slate-400">
          kecocokan
        </span>
      </div>
    </div>
  );
}

import { LucideIcon } from "lucide-react";

export interface Skill {
  id: string;
  name: string;
}

export interface Career {
  id: string;
  title: string;
  description: string | null;
  industry: string | null;
}

export interface RecommendationHistory {
  id: string;
  session_id: string;
  career_id: string;
  match_score: string;
  career: Career;
}

export interface RecommendationSession {
  id: string;
  user_id: string;
  created_at: string;
  recommendation_history: RecommendationHistory[];
}

export interface User {
  id: string;
  user_id: string;
  username: string;
  email: string;
  major: string;
  gpa: string;
  updated_at: string;
  is_onboarded: boolean;
}

export interface GreetingSectionProps {
  user: User;
  onReanalyze?: () => void;
}

export interface SkillBadgeProps {
  id: string;
  name: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
  disabled?: boolean;
}

export interface SkillInputFormProps {
  onAdd: (skill: string) => void;
  disabled?: boolean;
}

export interface RecommendationCardProps {
  title: string;
  match: number;
  subtitle?: string;
  icon: LucideIcon;
  skills?: string[];
  isTopMatch?: boolean;
}

export interface RecommendationProps {
  recommendation: RecommendationHistory[];
  isLoading: boolean;
}

export interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  unit?: string;
  variant?: "indigo" | "emerald" | "fuchsia";
}

export interface StatsSectionProps {
  recommendation: RecommendationHistory[];
}

import { apiClient } from "@/lib/api";
import {
  RecommendationHistory,
  RecommendationSession,
  Skill,
} from "../types/dashboard.types";

export const getLatestRecommendations = async (): Promise<
  RecommendationHistory[]
> => {
  const res = await apiClient.get<{ recommendation: RecommendationSession }>(
    "/recommendations/latest"
  );

  return res.data.recommendation.recommendation_history;
};

export const getSkills = async (): Promise<Skill[]> => {
  const res = await apiClient.get<{ skills: Skill[] }>("/skills");
  return res.data.skills;
};

export const getCurrentUserSkill = async (): Promise<Skill[]> => {
  const res = await apiClient.get<{ skills: { skills: Skill[] } }>("/user/profile/skill");
  return res.data.skills.skills;
};

export const updateSkills = async (skillIds: string[]) => {
  const res = await apiClient.post("/predictions/re-analyze", {
    skill_ids: skillIds,
  });
  return res.data;
};

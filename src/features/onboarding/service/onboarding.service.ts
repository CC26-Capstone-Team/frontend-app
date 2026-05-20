import { apiClient } from "@/lib/api";
import { Skill } from "../types/onboarding.types";

export const getSkills = async (): Promise<Skill[]> => {
  const res = await apiClient.get<{ skills: Skill[] }>("/skill");
  return res.data.skills;
};

export const submitOnboarding = async () => {
  const res = await apiClient.post("/onboarding");
  return res.data;
};

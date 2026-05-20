import { apiClient } from "@/lib/api";
import { OnboardingPayload, Skill } from "../types/onboarding.types";

export const getSkills = async (): Promise<Skill[]> => {
  const res = await apiClient.get<{ skills: Skill[] }>("/skills");
  return res.data.skills;
};

export const submitOnboarding = async (payload: OnboardingPayload) => {
  const res = await apiClient.post("/onboarding", payload);
  return res.data;
};

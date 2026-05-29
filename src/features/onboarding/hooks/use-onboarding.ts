import { useMutation, useQuery } from "@tanstack/react-query";
import { getEducationMetadata, getSkills, submitOnboarding } from "../service/onboarding.service";
import { OnboardingPayload } from "../types/onboarding.types";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
};

export const useEducationMetadata = () => {
  return useQuery({
    queryKey: ["educationMetadata"],
    queryFn: getEducationMetadata,
  });
};

export const useSubmitOnboarding = () => {
  return useMutation<void, Error, OnboardingPayload>({
    mutationFn: submitOnboarding,
    mutationKey: ["onboarding"],
  });
};

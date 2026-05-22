import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getCurrentUserSkill,
  getLatestRecommendations,
  getSkills,
  updateSkills,
} from "../service/dashboard.service";

export const useRecommendation = () => {
  return useQuery({
    queryKey: ["latest-recommendation"],
    queryFn: getLatestRecommendations,
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
};

export const useUserSkill = () => {
    return useQuery({
        queryKey: ["user-skills"],
        queryFn: getCurrentUserSkill,
    })
}

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-skills"],
    mutationFn: updateSkills,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-skills"] });
    },
  });
};
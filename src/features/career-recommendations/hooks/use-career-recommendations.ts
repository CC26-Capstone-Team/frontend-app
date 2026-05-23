import { useMutation, useQuery } from "@tanstack/react-query";
import {
  generateCourseRecommendation,
  getLatestSession,
  getRecommendationHistory,
  getJobRecommendations,
} from "../service/career-recommendations.service";

export const useLatestSession = () => {
  return useQuery({
    queryKey: ["latest-session"],
    queryFn: getLatestSession,
  });
};

export const useRecommendationHistory = () => {
  return useQuery({
    queryKey: ["recommendation-history"],
    queryFn: getRecommendationHistory,
  });
};

export const useCourseRecommendation = () => {
  return useMutation({
    mutationKey: ["course-recommendation"],
    mutationFn: generateCourseRecommendation,
  });
};

export const useJobRecommendations = (careerId: string) => {
  return useQuery({
    queryKey: ["job-recommendations", careerId],
    queryFn: () => getJobRecommendations(careerId),
    enabled: !!careerId,
  });
};

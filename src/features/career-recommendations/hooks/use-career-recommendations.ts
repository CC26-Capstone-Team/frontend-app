import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  generateCourseRecommendation,
  getLatestSession,
  getRecommendationHistory,
  getJobRecommendations,
  refreshJobRecommendations,
  refreshCourseRecommendation,
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

export const useCourseRecommendation = (targetCareer: string) => {
  return useQuery({
    queryKey: ["course-recommendation", targetCareer],
    queryFn: () => generateCourseRecommendation(targetCareer),
    enabled: !!targetCareer,
  });
};

export const useRefreshCourseRecommendation = (targetCareer: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => refreshCourseRecommendation(targetCareer),
    onSuccess: (newCourses) => {
      queryClient.setQueryData(["course-recommendation", targetCareer], newCourses);
    },
  });
};

export const useJobRecommendations = (targetCareer: string) => {
  return useQuery({
    queryKey: ["job-recommendations", targetCareer],
    queryFn: () => getJobRecommendations(targetCareer),
    enabled: !!targetCareer,
  });
};

export const useRefreshJobRecommendations = (targetCareer: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => refreshJobRecommendations(targetCareer),
    onSuccess: (newJobs) => {
      queryClient.setQueryData(["job-recommendations", targetCareer], newJobs);
    },
  });
};

import { apiClient } from "@/lib/api";
import type {
  CourseRecommendation,
  RecommendationSession,
  JobOpening,
} from "../types/career-recommendations.types";

export const getLatestSession =
  async (): Promise<RecommendationSession> => {
    const res = await apiClient.get<{
      recommendation: RecommendationSession;
    }>("/recommendations/latest");
    return res.data.recommendation;
  };

export const getRecommendationHistory = async (): Promise<
  RecommendationSession[]
> => {
  const res = await apiClient.get<{
    recommendation_history: RecommendationSession[];
  }>("/recommendations/history");
  return res.data.recommendation_history;
};

export const generateCourseRecommendation = async (
  targetCareer: string
): Promise<CourseRecommendation> => {
  const res = await apiClient.post<{
    course_recommendation: CourseRecommendation;
  }>("/recommendations/course", {
    target_career: targetCareer,
  });
  return res.data.course_recommendation;
};

export const getJobRecommendations = async (
  careerId: string
): Promise<JobOpening[]> => {
  const res = await apiClient.get<{
    jobs: JobOpening[];
  }>(`/jobs/recommendation/${careerId}`);
  return res.data.jobs;
};

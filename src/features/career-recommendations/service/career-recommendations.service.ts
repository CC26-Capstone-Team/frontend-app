import { apiClient } from "@/lib/api";
import type {
  CourseRecommendation,
  RecommendationSession,
  JobRecommendationResponse,
} from "../types/career-recommendations.types";

export const getLatestSession = async (): Promise<RecommendationSession> => {
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
  const res = await apiClient.get<{
    course_recommendation: CourseRecommendation;
  }>(`/recommendations/course/${encodeURIComponent(targetCareer)}`);
  return res.data.course_recommendation;
};

export const refreshCourseRecommendation = async (
  targetCareer: string
): Promise<CourseRecommendation> => {
  const res = await apiClient.get<{
    course_recommendation: CourseRecommendation;
  }>(`/recommendations/course/${encodeURIComponent(targetCareer)}?force=true`);
  return res.data.course_recommendation;
};

export const getJobRecommendations = async (
  targetCareer: string
): Promise<JobRecommendationResponse> => {
  const res = await apiClient.get<{
    job_recommendation: JobRecommendationResponse;
  }>(`/recommendations/jobs/${encodeURIComponent(targetCareer)}`);
  return res.data.job_recommendation;
};

export const refreshJobRecommendations = async (
  targetCareer: string
): Promise<JobRecommendationResponse> => {
  const res = await apiClient.get<{
    job_recommendation: JobRecommendationResponse;
  }>(`/recommendations/jobs/${encodeURIComponent(targetCareer)}?force=true`);
  return res.data.job_recommendation;
};

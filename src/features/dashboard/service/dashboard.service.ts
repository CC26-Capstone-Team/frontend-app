import { apiClient } from "@/lib/api";

interface Career {
  id: string;
  title: string;
  description: string | null;
  industry: string | null;
}

interface RecommendationHistory {
  id: string;
  session_id: string;
  career_id: string;
  match_score: string;
  career: Career;
}

interface RecommendationSession {
  id: string;
  user_id: string;
  created_at: string;
  recommendation_history: RecommendationHistory[];
}

export const getLatestRecommendations = async (): Promise<
  RecommendationHistory[]
> => {
  const res = await apiClient.get<{ recommendation: RecommendationSession }>(
    "/recommendations/latest"
  );

  return res.data.recommendation.recommendation_history;
};

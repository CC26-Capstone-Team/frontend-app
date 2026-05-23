export interface Career {
  id: string;
  title: string;
  description: string | null;
  industry: string | null;
}

export interface RecommendationHistory {
  id: string;
  session_id: string;
  career_id: string;
  match_score: string;
  career: Career;
}

export interface RecommendationSession {
  id: string;
  user_id: string;
  created_at: string;
  recommendation_history: RecommendationHistory[];
}

export interface CourseItem {
  id: string;
  topic: string;
  platform: string;
  reason: string;
  level: string;
}

export interface CourseRecommendation {
  id: string;
  user_id: string;
  career_id: string;
  analysis: string;
  created_at: string;
  courses: CourseItem[];
  career?: Career;
}

export interface JobOpening {
  id: string;
  career_id: string;
  company: string;
  role: string;
  location: string;
  type: string;
  salary: string | null;
  posted_at: string;
}

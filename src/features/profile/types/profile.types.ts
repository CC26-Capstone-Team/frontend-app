export interface Skill {
  id: string;
  name: string;
}

export interface UserProfile {
  user_id: string;
  education_level: string;
  major: string;
  gpa: number | null;
  updated_at: string;
}

export interface FullUserProfile {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  profile: UserProfile | null;
  skills: Skill[];
}

export interface UpdateProfilePayload {
  education_level?: string;
  major?: string;
  gpa?: number;
}

export interface CreateProfilePayload {
  education_level: string;
  major: string;
  gpa?: number;
}

export interface UpdateSkillPayload {
  skill_ids: string[];
}

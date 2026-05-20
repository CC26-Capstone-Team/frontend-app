export interface Skill {
  id: string;
  name: string;
}

export interface OnboardingPayload {
  education_level: string;
  major: string;
  gpa: number;
  skill_ids: string[];
}

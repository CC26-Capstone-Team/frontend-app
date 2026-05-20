export interface Skill {
  id: string;
  name: string;
}

export interface OnboardingPayload {
  education_leve: string;
  major: string;
  gpa: number;
  skill_id: string[];
}

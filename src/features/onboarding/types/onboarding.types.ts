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

export interface SkillSelectedProps {
  selected: string[];
  selectedSkillsData: { id: string; name: string }[];
  toggle: (id: string) => void;
  isPending: boolean;
}

export interface SkillSearchProps {
  searchSkill: string;
  setSearchSkill: (value: string) => void;
}

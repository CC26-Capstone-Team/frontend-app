import { apiClient } from "@/lib/api";
import type {
  FullUserProfile,
  CreateProfilePayload,
  UpdateProfilePayload,
  UpdateSkillPayload,
  Skill,
} from "../types/profile.types";

export const getUserProfile = async (): Promise<FullUserProfile> => {
  const res = await apiClient.get<{ profile: FullUserProfile }>("/user/profile");
  return res.data.profile;
};

export const createUserProfile = async (
  payload: CreateProfilePayload
): Promise<FullUserProfile["profile"]> => {
  const res = await apiClient.post<{ profile: FullUserProfile["profile"] }>(
    "/user/profile",
    payload
  );
  return res.data.profile;
};

export const updateUserProfile = async (
  payload: UpdateProfilePayload
): Promise<FullUserProfile["profile"]> => {
  const res = await apiClient.put<{ profile: FullUserProfile["profile"] }>(
    "/user/profile",
    payload
  );
  return res.data.profile;
};

export const updateUserSkills = async (
  payload: UpdateSkillPayload
): Promise<Skill[]> => {
  const res = await apiClient.put<{ profile: Skill[] }>(
    "/user/profile/skill",
    payload
  );
  return res.data.profile;
};

export const getAllSkills = async (): Promise<Skill[]> => {
  const res = await apiClient.get<{ skills: Skill[] }>("/skills");
  return res.data.skills;
};

export const uploadAvatarPhoto = async (file: File): Promise<{ id: string; avatar_url: string }> => {
  const formData = new FormData();
  formData.append("avatar", file);
  const res = await apiClient.post<{ user: { id: string; avatar_url: string } }>(
    "/user/profile/avatar",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data.user;
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  updateUserSkills,
  getAllSkills,
  uploadAvatarPhoto,
} from "../service/profile.service";
import type { CreateProfilePayload, UpdateProfilePayload, UpdateSkillPayload } from "../types/profile.types";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });
};

export const useAllSkills = () => {
  return useQuery({
    queryKey: ["all-skills"],
    queryFn: getAllSkills,
  });
};

export const useCreateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProfilePayload) => createUserProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateUserProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};

export const useUpdateUserSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateSkillPayload) => updateUserSkills(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadAvatarPhoto(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};

"use client";

import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

// Interfaces
interface AuthResponse {
  status: string;
  message: string;
  user: {
    id: string;
    email: string;
    token: string;
  };
}

interface AuthCredentials {
  email: string;
  password?: string;
  googleId?: string;
  avatarUrl?: string;
}

export const useLogin = () => {
  return useMutation<AuthResponse, Error, AuthCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Simpan kuki token selama 7 hari
      Cookies.set("token", data.user.token, { expires: 7, path: "/" });
    },
  });
};

export const useRegister = () => {
  return useMutation<AuthResponse, Error, AuthCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post<AuthResponse>("/auth/register", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Simpan kuki token selama 7 hari
      Cookies.set("token", data.user.token, { expires: 7, path: "/" });
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/logout");
    },
    onSuccess: () => {
      Cookies.remove("token", { path: "/" });
      window.location.href = "/login";
    },
    onError: () => {
      // Jika gagal tetap hapus token lokal demi keamanan
      Cookies.remove("token", { path: "/" });
      window.location.href = "/login";
    },
  });
};

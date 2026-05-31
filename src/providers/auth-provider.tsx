"use client";

import { apiClient } from "@/lib/api";
import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";

interface Skill {
  id: string;
  name: string;
}

interface User {
  id: string;
  user_id: string;
  username: string;
  email: string;
  token: string;
  major: string;
  gpa: string;
  updated_at: string;
  skills: Skill[];
  is_onboarded: boolean;
  avatar_url: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (googleToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    const res = await apiClient.get<{ profile: User }>("/user/profile");
    setUser(res.data.profile);
  };

  useEffect(() => {
    fetchProfile()
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post<{
      user: { is_onboarded: boolean; token: string };
    }>("/auth/login", { email, password });

    setCookie("token", res.data.user.token, { maxAge: 60 * 60 * 24 * 7 });
    setCookie("is_onboarded", String(res.data.user.is_onboarded));
    await fetchProfile();
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await apiClient.post<{
      user: { is_onboarded: boolean; token: string };
    }>("/auth/register", { name, email, password });

    setCookie("token", res.data.user.token, { maxAge: 60 * 60 * 24 * 7 });
    setCookie("is_onboarded", String(res.data.user.is_onboarded));
    await fetchProfile();
  };

  const loginWithGoogle = async (googleToken: string) => {
    const res = await apiClient.post<{ user: { is_onboarded: boolean } }>(
      "/auth/google", // Endpoint backend Express.js yang akan kita buat
      { token: googleToken }
    );
    setCookie("is_onboarded", String(res.data.user.is_onboarded));
    await fetchProfile();
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      deleteCookie("token");
      deleteCookie("is_onboarding");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, loginWithGoogle, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

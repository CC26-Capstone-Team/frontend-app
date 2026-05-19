"use client";

import { apiClient } from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

interface Skill {
  id: string;
  name: string;
}

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  major: string;
  gpa: string;
  updated_at: string;
  skills: Skill[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Karena token ada di HttpOnly cookie, kita tidak bisa membacanya di JS.
    // Langsung saja coba tembak endpoint profile. Jika gagal (401), interceptor
    // akan mengarahkan ke halaman login.
    apiClient
      .get<{ user: User }>("/user/profile")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post<{ user: User & { token?: string } }>(
      "/auth/login",
      { email, password }
    );
    setUser(res.data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await apiClient.post<{ user: User & { token?: string } }>(
      "/auth/register",
      { name, email, password }
    );
    setUser(res.data.user);
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

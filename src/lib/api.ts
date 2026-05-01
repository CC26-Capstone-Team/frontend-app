import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
});

apiClient.interceptors.request.use((config) => {
  const token = getCookie("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      deleteCookie("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

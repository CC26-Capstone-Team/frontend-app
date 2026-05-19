import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  // Karena cookie diatur oleh backend (HttpOnly), 
  // browser akan mengirimkannya secara otomatis berkat withCredentials: true.
  // Tidak perlu lagi membaca dari js-cookie / cookies-next.
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(error);
  }
);

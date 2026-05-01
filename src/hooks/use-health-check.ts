import { apiClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ["health-check"],
    queryFn: async () => {
      // Axios Instance 'api' digunakan di sini
      const { data } = await apiClient.get("/");
      return data;
    },
  });
};

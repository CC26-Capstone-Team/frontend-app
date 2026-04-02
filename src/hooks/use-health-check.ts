import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ["health-check"],
    queryFn: async () => {
      // Axios Instance 'api' digunakan di sini
      const { data } = await api.get("/");
      return data;
    },
  });
};

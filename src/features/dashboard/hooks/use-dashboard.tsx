import { useQuery } from "@tanstack/react-query"
import { getLatestRecommendations } from "../service/dashboard.service"

export const useRecommendation = () => {
    return useQuery({
        queryKey: ['latest-recommendation'],
        queryFn: getLatestRecommendations
    })
}
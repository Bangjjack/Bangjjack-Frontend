import { useQuery } from "@tanstack/react-query";
import { getRecommendedRoommates } from "@/api";
import { homeQueryKeys } from "@/features/home/queries";

const RECOMMENDED_STALE_TIME = 5 * 60 * 1000;
const RECOMMENDED_GC_TIME = 10 * 60 * 1000;

export const useRecommendedRoommates = () => {
  return useQuery({
    queryKey: homeQueryKeys.recommendedRoommates(),
    queryFn: getRecommendedRoommates,
    staleTime: RECOMMENDED_STALE_TIME,
    gcTime: RECOMMENDED_GC_TIME,
  });
};

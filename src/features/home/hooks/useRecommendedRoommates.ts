import { useQuery } from "@tanstack/react-query";
import { getRecommendedRoommates } from "@/api";
import { homeQueryKeys } from "@/features/home/queries";

export const useRecommendedRoommates = () => {
  return useQuery({
    queryKey: homeQueryKeys.recommendedRoommates(),
    queryFn: getRecommendedRoommates,
  });
};

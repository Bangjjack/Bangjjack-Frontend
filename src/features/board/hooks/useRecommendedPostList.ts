import { useQuery } from "@tanstack/react-query";
import { getRecommendedPosts } from "@/api";
import { postQueryKeys } from "@/features/board/queries";
import type { RoomSize } from "@/features/board/types";

const RECOMMENDED_STALE_TIME = 5 * 60 * 1000;

export const useRecommendedPostList = (params: { roomSize?: RoomSize }, enabled = true) => {
  return useQuery({
    queryKey: postQueryKeys.recommended(params),
    queryFn: () => getRecommendedPosts(params),
    staleTime: RECOMMENDED_STALE_TIME,
    enabled,
  });
};

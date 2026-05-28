import { useQuery } from "@tanstack/react-query";
import { getRecommendedPosts } from "@/api";
import { postQueryKeys } from "@/features/board/queries";
import type { RoomSize } from "@/features/board/types";

export const useRecommendedPostList = (params: { roomSize?: RoomSize }) => {
  return useQuery({
    queryKey: postQueryKeys.recommended(params),
    queryFn: () => getRecommendedPosts(params),
  });
};

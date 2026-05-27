import { useQuery } from "@tanstack/react-query";

import { getPostMatchRate } from "@/api";
import { postQueryKeys } from "@/features/board/queries";

export function usePostMatchRate(postId: number) {
  return useQuery({
    queryKey: postQueryKeys.matchRate(postId),
    queryFn: () => getPostMatchRate(postId),
    enabled: false,
  });
}

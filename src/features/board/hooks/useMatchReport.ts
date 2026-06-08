import { useQuery } from "@tanstack/react-query";

import { getMatchReport } from "@/api";
import { postQueryKeys } from "@/features/board/queries";

export function useMatchReport(targetUserId: number, enabled = false) {
  return useQuery({
    queryKey: postQueryKeys.matchReport(targetUserId),
    queryFn: () => getMatchReport(targetUserId),
    enabled,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

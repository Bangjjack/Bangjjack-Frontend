import { useQuery } from "@tanstack/react-query";

import { getMyRoommateGroups } from "@/api";
import { roommateGroupQueryKeys } from "@/features/roommate-group/queries";

export const useMyRoommateGroups = () => {
  return useQuery({
    queryKey: roommateGroupQueryKeys.me(),
    queryFn: getMyRoommateGroups,
  });
};

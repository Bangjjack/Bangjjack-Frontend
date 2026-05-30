import { useMutation, useQueryClient } from "@tanstack/react-query";

import { leaveRoommateGroup } from "@/api";
import { roommateGroupQueryKeys } from "@/features/roommate-group/queries";

export const useLeaveRoommateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveRoommateGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roommateGroupQueryKeys.me() });
    },
  });
};

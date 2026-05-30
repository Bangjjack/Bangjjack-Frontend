import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelRoommateApplication } from "@/api";
import { chatQueryKeys } from "@/features/chat/queries";

export const useCancelRoommateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelRoommateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.rooms() });
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.messages() });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { processRoommateApplication } from "@/api";
import { chatQueryKeys } from "@/features/chat/queries";

export const useProcessRoommateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processRoommateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.rooms() });
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.messages() });
    },
  });
};

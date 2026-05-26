import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendRoommateApplication } from "@/api";
import { chatQueryKeys } from "@/features/chat/queries";

export const useSendRoommateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendRoommateApplication,
    onSuccess: () => {
      console.log("[chat] sendRoommateApplication succeeded. invalidate chat queries");
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.rooms() });
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.messages() });
    },
  });
};

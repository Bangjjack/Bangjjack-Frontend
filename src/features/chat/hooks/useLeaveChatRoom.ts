import { useMutation, useQueryClient } from "@tanstack/react-query";

import { leaveChatRoom } from "@/api/chat";
import { chatQueryKeys } from "@/features/chat/queries";

export const useLeaveChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.rooms() });
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.messages() });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createChatRoom } from "@/api/chat";
import { chatQueryKeys } from "@/features/chat/queries";

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.rooms() });
    },
  });
};

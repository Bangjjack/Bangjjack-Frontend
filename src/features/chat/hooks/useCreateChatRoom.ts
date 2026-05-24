import { useMutation } from "@tanstack/react-query";

import { createChatRoom } from "@/api/chat";

export const useCreateChatRoom = () => {
  return useMutation({
    mutationFn: createChatRoom,
  });
};

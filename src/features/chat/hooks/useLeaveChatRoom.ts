import { useMutation, useQueryClient } from "@tanstack/react-query";

import { leaveChatRoom } from "@/api/chat";
import { chatQueryKeys } from "@/features/chat/queries";

export const useLeaveChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveChatRoom,
    onSuccess: (_, roomId) => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.rooms() });
      queryClient.removeQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === chatQueryKeys.all[0] &&
          queryKey[1] === "messages" &&
          typeof queryKey[2] === "object" &&
          queryKey[2] !== null &&
          "roomId" in queryKey[2] &&
          queryKey[2].roomId === roomId,
      });
    },
  });
};

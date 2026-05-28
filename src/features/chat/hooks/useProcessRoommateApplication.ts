import { useMutation, useQueryClient } from "@tanstack/react-query";

import { processRoommateApplication } from "@/api";
import { chatQueryKeys } from "@/features/chat/queries";

export const useProcessRoommateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processRoommateApplication,
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.rooms() });
      queryClient.removeQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === chatQueryKeys.all[0] &&
          queryKey[1] === "messages" &&
          typeof queryKey[2] === "object" &&
          queryKey[2] !== null &&
          "roomId" in queryKey[2] &&
          queryKey[2].roomId === application.chatRoomId,
      });
    },
  });
};

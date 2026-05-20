import { useMutation } from "@tanstack/react-query";

import { issueChatWsToken } from "@/api/chat";

export const useIssueChatWsToken = () => {
  return useMutation({
    mutationFn: issueChatWsToken,
  });
};

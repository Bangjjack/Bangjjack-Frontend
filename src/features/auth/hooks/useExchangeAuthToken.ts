import { useMutation } from "@tanstack/react-query";

import { exchangeAuthToken } from "@/api";

export const useExchangeAuthToken = () => {
  return useMutation({
    mutationFn: exchangeAuthToken,
  });
};

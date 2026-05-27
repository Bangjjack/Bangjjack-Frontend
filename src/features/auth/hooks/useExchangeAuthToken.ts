import { useMutation } from "@tanstack/react-query";

import { exchangeAuthToken } from "@/api";
import type { AuthTokenResponse } from "@/features/auth/types";

type UseExchangeAuthTokenOptions = {
  onError?: (error: Error) => void;
  onSuccess?: (authTokenResponse: AuthTokenResponse) => void;
};

export const useExchangeAuthToken = (options?: UseExchangeAuthTokenOptions) => {
  return useMutation({
    mutationFn: exchangeAuthToken,
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });
};

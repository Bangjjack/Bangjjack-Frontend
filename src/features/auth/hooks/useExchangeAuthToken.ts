import { useMutation } from "@tanstack/react-query";

import { exchangeAuthToken, type AuthTokenResponse } from "@/api";

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

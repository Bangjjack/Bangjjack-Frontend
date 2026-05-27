import { useQuery } from "@tanstack/react-query";

import { authQueryKeys, type AuthRegistrationStatus } from "@/features/auth/queries";

export const useRegistrationStatus = () => {
  return useQuery<AuthRegistrationStatus | undefined>({
    enabled: false,
    queryKey: authQueryKeys.registrationStatus(),
    staleTime: Infinity,
  });
};

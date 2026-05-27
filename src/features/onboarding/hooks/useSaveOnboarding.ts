import { useMutation } from "@tanstack/react-query";

import { saveOnboarding } from "@/api";

type UseSaveOnboardingOptions = {
  onError?: (error: Error) => void;
};

export const useSaveOnboarding = (options?: UseSaveOnboardingOptions) => {
  return useMutation({
    mutationFn: saveOnboarding,
    onError: options?.onError,
  });
};

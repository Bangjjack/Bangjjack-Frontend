import { useMutation } from "@tanstack/react-query";

import { saveOnboardingPreference } from "@/api";

type UseSaveOnboardingPreferenceOptions = {
  onError?: (error: Error) => void;
};

export const useSaveOnboardingPreference = (options?: UseSaveOnboardingPreferenceOptions) => {
  return useMutation({
    mutationFn: saveOnboardingPreference,
    onError: options?.onError,
  });
};

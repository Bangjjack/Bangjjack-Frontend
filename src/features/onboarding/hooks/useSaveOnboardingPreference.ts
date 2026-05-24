import { useMutation } from "@tanstack/react-query";

import { saveOnboardingPreference } from "@/api";

export const useSaveOnboardingPreference = () => {
  return useMutation({
    mutationFn: saveOnboardingPreference,
  });
};

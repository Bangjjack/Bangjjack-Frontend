import { useMutation } from "@tanstack/react-query";

import { saveOnboardingChecklist } from "@/api";

type UseSaveOnboardingChecklistOptions = {
  onError?: (error: Error) => void;
};

export const useSaveOnboardingChecklist = (options?: UseSaveOnboardingChecklistOptions) => {
  return useMutation({
    mutationFn: saveOnboardingChecklist,
    onError: options?.onError,
  });
};

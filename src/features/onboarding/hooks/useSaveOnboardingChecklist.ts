import { useMutation } from "@tanstack/react-query";

import { saveOnboardingChecklist } from "@/api";

export const useSaveOnboardingChecklist = () => {
  return useMutation({
    mutationFn: saveOnboardingChecklist,
  });
};

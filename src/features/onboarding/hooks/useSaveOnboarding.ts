import { useMutation } from "@tanstack/react-query";

import { saveOnboarding } from "@/api";

export const useSaveOnboarding = () => {
  return useMutation({
    mutationFn: saveOnboarding,
  });
};

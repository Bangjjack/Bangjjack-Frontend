import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveOnboardingChecklist } from "@/api";
import { userQueryKeys } from "@/features/user/queries";

type UseSaveOnboardingChecklistOptions = {
  onError?: (error: Error) => void;
};

export const useSaveOnboardingChecklist = (options?: UseSaveOnboardingChecklistOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveOnboardingChecklist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.checklist() });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.myProfile() });
    },
    onError: options?.onError,
  });
};

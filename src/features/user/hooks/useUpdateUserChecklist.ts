import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserChecklist } from "@/api";
import { userQueryKeys } from "@/features/user/queries";

export const useUpdateUserChecklist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserChecklist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.checklist() });
    },
  });
};

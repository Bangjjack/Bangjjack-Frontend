import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserProfile } from "@/api";
import { userQueryKeys } from "@/features/user/queries";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.myProfile() });
    },
  });
};

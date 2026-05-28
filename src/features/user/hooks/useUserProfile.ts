import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "@/api";
import { userQueryKeys } from "@/features/user/queries";

export const useUserProfile = (userId: number) => {
  return useQuery({
    queryKey: userQueryKeys.profile(userId),
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  });
};

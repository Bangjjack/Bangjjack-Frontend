import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "@/api";
import { userQueryKeys } from "@/features/user/queries";

export const useUserProfile = () => {
  return useQuery({
    queryKey: userQueryKeys.profile(),
    queryFn: getUserProfile,
  });
};

import { useQuery } from "@tanstack/react-query";

import { getMyProfile } from "@/api";
import { userQueryKeys } from "@/features/user/queries";

export const useMyProfile = () => {
  return useQuery({
    queryKey: userQueryKeys.myProfile(),
    queryFn: getMyProfile,
  });
};

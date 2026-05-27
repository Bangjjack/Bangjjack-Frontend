import { useQuery } from "@tanstack/react-query";

import { getUserTags } from "@/api";
import { userQueryKeys } from "@/features/user/queries";

export const useUserTags = () => {
  return useQuery({
    queryKey: userQueryKeys.tags(),
    queryFn: getUserTags,
  });
};

import { useQuery } from "@tanstack/react-query";

import { getUserTags } from "@/api";
import { userTagQueryKeys } from "@/features/board/queries";

export const useUserTags = () => {
  return useQuery({
    queryKey: userTagQueryKeys.me(),
    queryFn: getUserTags,
  });
};

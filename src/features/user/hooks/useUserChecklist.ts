import { useQuery } from "@tanstack/react-query";

import { getUserChecklist } from "@/api";
import { userQueryKeys } from "@/features/user/queries";

export const useUserChecklist = () => {
  return useQuery({
    queryKey: userQueryKeys.checklist(),
    queryFn: getUserChecklist,
  });
};

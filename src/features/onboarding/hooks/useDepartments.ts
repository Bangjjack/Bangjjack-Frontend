import { useQuery } from "@tanstack/react-query";

import { getDepartments } from "@/api";
import { departmentQueryKeys } from "@/features/onboarding/queries";
import type { Campus } from "@/types";

export const useDepartments = (campus: Campus | null) => {
  return useQuery({
    queryKey: departmentQueryKeys.list(campus),
    queryFn: () => getDepartments({ campus: campus as Campus }),
    enabled: campus !== null,
  });
};

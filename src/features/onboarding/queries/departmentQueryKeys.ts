import type { Campus } from "@/types";

export const departmentQueryKeys = {
  all: ["departments"] as const,
  lists: () => [...departmentQueryKeys.all, "list"] as const,
  list: (campus: Campus | null) => [...departmentQueryKeys.lists(), campus] as const,
};

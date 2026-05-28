import type { PostListFilterParams, RoomSize } from "@/features/board/types";

export const postQueryKeys = {
  all: ["posts"] as const,
  lists: () => [...postQueryKeys.all, "list"] as const,
  list: (params: PostListFilterParams) => [...postQueryKeys.lists(), params] as const,
  preview: () => [...postQueryKeys.all, "preview"] as const,
  details: () => [...postQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...postQueryKeys.details(), id] as const,
  matchRate: (id: number) => [...postQueryKeys.all, "matchRate", id] as const,
  recommended: (params: { roomSize?: RoomSize }) =>
    [...postQueryKeys.all, "recommended", params] as const,
};

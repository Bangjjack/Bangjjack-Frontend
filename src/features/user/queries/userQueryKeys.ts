export const userQueryKeys = {
  all: ["user"] as const,
  checklist: () => [...userQueryKeys.all, "checklist"] as const,
  tags: () => [...userQueryKeys.all, "tags"] as const,
  profile: (userId: number) => [...userQueryKeys.all, "profile", userId] as const,
};

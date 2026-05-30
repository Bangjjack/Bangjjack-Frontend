export const roommateGroupQueryKeys = {
  all: ["roommateGroup"] as const,
  me: () => [...roommateGroupQueryKeys.all, "me"] as const,
};

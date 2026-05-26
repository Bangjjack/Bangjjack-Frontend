export const userTagQueryKeys = {
  all: ["userTags"] as const,
  me: () => [...userTagQueryKeys.all, "me"] as const,
};

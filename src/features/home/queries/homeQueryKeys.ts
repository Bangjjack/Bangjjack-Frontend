export const homeQueryKeys = {
  all: ["home"] as const,
  recommendedRoommates: () => [...homeQueryKeys.all, "recommendedRoommates"] as const,
};

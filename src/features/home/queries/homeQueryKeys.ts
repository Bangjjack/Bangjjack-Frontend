const HOME_QUERY_SEGMENTS = {
  root: "home",
  recommendedRoommates: "recommendedRoommates",
} as const;

export const homeQueryKeys = {
  all: [HOME_QUERY_SEGMENTS.root] as const,
  recommendedRoommates: () =>
    [...homeQueryKeys.all, HOME_QUERY_SEGMENTS.recommendedRoommates] as const,
};

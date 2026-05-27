export const mypageQueryKeys = {
  all: ["mypage"] as const,
  bookmarks: () => [...mypageQueryKeys.all, "bookmarks"] as const,
};

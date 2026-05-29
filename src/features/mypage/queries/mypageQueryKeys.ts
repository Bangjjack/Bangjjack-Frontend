export const mypageQueryKeys = {
  all: ["mypage"] as const,
  bookmarks: () => [...mypageQueryKeys.all, "bookmarks"] as const,
  myPosts: () => [...mypageQueryKeys.all, "my-posts"] as const,
};

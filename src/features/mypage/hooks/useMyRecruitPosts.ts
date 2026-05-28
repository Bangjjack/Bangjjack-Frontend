import { useQuery } from "@tanstack/react-query";

import { getMyPosts } from "@/api";
import { mypageQueryKeys } from "@/features/mypage/queries";

export const useMyRecruitPosts = () => {
  return useQuery({
    queryKey: mypageQueryKeys.myPosts(),
    queryFn: getMyPosts,
  });
};

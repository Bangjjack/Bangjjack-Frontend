import { useQuery } from "@tanstack/react-query";

import { getPosts } from "@/api/posts";
import { postQueryKeys } from "@/features/board/queries";

const HOME_POST_SIZE = 5;

export const useHomePostList = () => {
  return useQuery({
    queryKey: postQueryKeys.preview(),
    queryFn: () => getPosts({ pageable: { page: 0, size: HOME_POST_SIZE, sort: [] } }),
  });
};

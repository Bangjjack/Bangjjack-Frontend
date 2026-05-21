import type { Campus, RoomSize, SharedLifestyle } from "@/types";

/** 게시글 작성 요청 body */
type CreatePostRequest = {
  title: string;
  roomSize: RoomSize;
  recruitMemberCount: number;
  description: string;
  sharedLifestyle: SharedLifestyle;
};

type UpdatePostRequest = CreatePostRequest;

/** 게시글 목록 필터 params (queryKey용) */
type PostListFilterParams = {
  campus?: Campus;
  roomSize?: RoomSize;
};

/** 게시글 목록 조회 params */
type GetPostsParams = PostListFilterParams & {
  page: number;
  size: number;
  sort: string[];
};

export type { CreatePostRequest, UpdatePostRequest, PostListFilterParams, GetPostsParams };

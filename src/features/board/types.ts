import type { Dormitory, PostStatus, RoomSize, Semester, SharedLifestyle } from "@/types";

export type {
  TagItem,
  BasicTagCategory,
  HabitCategory,
  Habit,
  RoomSize,
  PostStatus,
  Semester,
  Dormitory,
  Recycling,
  PhoneCall,
  ItemSharing,
  LightsOutTime,
  SharedLifestyle,
} from "@/types";

/** 작성자 정보 */
type PostAuthor = {
  authorId: number;
  username: string;
  profileImage: string;
};

/** 게시글 상세 응답 data */
type PostDetail = {
  postId: number;
  title: string;
  description: string;
  roomSize: RoomSize;
  recruitMemberCount: number;
  status: PostStatus;
  semester: Semester;
  dormitory: Dormitory;
  isOwner: boolean;
  createdAt: string;
  author: PostAuthor;
  sharedLifestyle: SharedLifestyle;
  roommatePreferences?: string[];
};

/** API 공통 응답 래퍼 */
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

/** 게시글 작성 요청 body */
type CreatePostRequest = {
  title: string;
  roomSize: RoomSize;
  recruitMemberCount: number;
  description: string;
  sharedLifestyle: SharedLifestyle;
};

type UpdatePostRequest = CreatePostRequest;

export type { PostAuthor, PostDetail, ApiResponse, CreatePostRequest, UpdatePostRequest };

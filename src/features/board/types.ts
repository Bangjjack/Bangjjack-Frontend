import type { RoommatePreference } from "@/constants";
import type { Campus, Dormitory, PostStatus, RoomSize, Semester, SharedLifestyle } from "@/types";

export type {
  TagItem,
  BasicTagCategory,
  HabitCategory,
  Habit,
  RoomSize,
  PostStatus,
  Semester,
  Dormitory,
  Campus,
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

/** 룸메이트 우선순위 */
type PostRoommatePreference = {
  firstPriority: RoommatePreference;
  secondPriority: RoommatePreference;
  thirdPriority: RoommatePreference;
};

/** 룸메이트 멤버 */
type PostMember = {
  userId: number;
  username: string;
  profileImage: string;
  role: "LEADER" | "MEMBER";
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
  isBookmarked: boolean;
  createdAt: string;
  author: PostAuthor;
  sharedLifestyle: SharedLifestyle;
  roommatePreference?: PostRoommatePreference;
  members: PostMember[];
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

/** 게시글 목록 아이템 */
type PostListItem = {
  postId: number;
  title: string;
  description: string;
  dormitory: Dormitory;
  roomSize: RoomSize;
  recruitMemberCount: number;
  createdAt: string;
};

/** 게시글 목록 응답 data */
type PostListData = {
  content: PostListItem[];
  hasNext: boolean;
};

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

export type {
  PostAuthor,
  PostMember,
  PostRoommatePreference,
  PostDetail,
  ApiResponse,
  CreatePostRequest,
  UpdatePostRequest,
  PostListItem,
  PostListData,
  PostListFilterParams,
  GetPostsParams,
};

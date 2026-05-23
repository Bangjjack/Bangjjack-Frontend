import type { MemberRole, RoommatePreference } from "@/constants";
import type { Dormitory, RoomSize, PostStatus, Semester, SharedLifestyle } from "@/types";

/** 작성자 정보 */
type PostAuthor = {
  authorId: number;
  username: string;
  profileImage: string;
};

/** 룸메이트 멤버 */
type PostMember = {
  userId: number;
  username: string;
  profileImage: string;
  role: MemberRole;
};

/** 룸메이트 우선순위 */
type PostRoommatePreference = {
  firstPriority: RoommatePreference;
  secondPriority: RoommatePreference;
  thirdPriority: RoommatePreference;
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

export type {
  PostAuthor,
  PostMember,
  PostRoommatePreference,
  PostDetail,
  PostListItem,
  PostListData,
};

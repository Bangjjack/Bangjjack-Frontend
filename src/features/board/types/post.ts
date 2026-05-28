import type { MemberRole, RoommatePreference } from "@/constants";
import type { Dormitory, RoomSize, PostStatus, Semester, SharedLifestyle, Smoking } from "@/types";

/** 작성자 정보 */
type PostAuthor = {
  authorId: number;
  username: string;
  profileImage: string;
};

/** 생활습관 체크리스트 단일 필드 */
type ChecklistField<T = string> = {
  value: T;
  matched: boolean;
};

/** 룸메이트 생활습관 체크리스트 */
type PostMemberLifestyleChecklist = {
  bedtime: ChecklistField;
  wakeUpTime: ChecklistField;
  sleepHabits: ChecklistField<string[]>;
  cleaningCycle: ChecklistField;
  dormStayTime: ChecklistField;
  callHabit: ChecklistField;
  indoorTemperature: ChecklistField;
  noiseSensitivity: ChecklistField;
  smoking: ChecklistField;
};

/** 룸메이트 멤버 */
type PostMember = {
  userId: number;
  username: string;
  profileImage: string;
  role: MemberRole;
  lifestyleChecklist: PostMemberLifestyleChecklist;
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

/** 매칭률 조회 응답 data */
type PostMatchRateData = {
  matchRate: number;
  matchedAttributes: string[];
  recommendedTopics: string[];
};

/** AI 추천 모집글 아이템 */
type RecommendedPostItem = {
  postId: number;
  title: string;
  description: string;
  dormitory: Dormitory;
  roomSize: RoomSize;
  smoking: Smoking;
  currentMemberCount: number;
  totalMemberCount: number;
  matchRate: number;
  createdAt: string;
};

export type {
  ChecklistField,
  PostAuthor,
  PostMember,
  PostMemberLifestyleChecklist,
  PostRoommatePreference,
  PostDetail,
  PostListItem,
  PostListData,
  PostMatchRateData,
  RecommendedPostItem,
};

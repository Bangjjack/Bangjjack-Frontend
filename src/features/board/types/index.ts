export type {
  TagItem,
  BasicTagCategory,
  HabitCategory,
  Habit,
  RoomSize,
  PostStatus,
  Semester,
  Dormitory,
  Smoking,
  Campus,
  Recycling,
  PhoneCall,
  ItemSharing,
  LightsOutTime,
  SharedLifestyle,
} from "@/types";

export type {
  ChecklistField,
  MatchRateConversationStarter,
  MatchRateFeature,
  MatchRateMismatchedFeature,
  PostAuthor,
  PostMember,
  PostMemberLifestyleChecklist,
  PostRoommatePreference,
  PostDetail,
  PostListItem,
  PostListData,
  PostMatchRateData,
  RecommendedPostItem,
} from "./post";

export type {
  CreatePostRequest,
  UpdatePostRequest,
  PostListFilterParams,
  GetPostsParams,
} from "./postRequest";

export type { BoardPageContentProps, PostListProps, RecommendedPostListProps } from "./postList";

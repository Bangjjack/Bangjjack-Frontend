import type { Dormitory, PostStatus, RoomSize } from "@/types";

export interface BookmarkedPost {
  postId: number;
  title: string;
  description: string;
  dormitory: Dormitory;
  roomSize: RoomSize;
  recruitMemberCount: number;
  status: PostStatus;
  bookmarkedAt: string;
}

export interface BookmarkedPostsData {
  content: BookmarkedPost[];
  hasNext: boolean;
}

export interface GetBookmarksParams {
  page?: number;
  size?: number;
  sort?: string[];
}

export type MyChecklistSelectionType = "single" | "multi";
export type MyActivityTabId = "posts" | "rooms" | "matches";
export type MyActivityRoomVariant = "leader" | "member";
export type MyActivityRoomStatus = "joined";
export type MyRecruitPostStatus = "open" | "closed";
export type MyRecruitPostActionTone = "neutral" | "primary" | "dark";

export type {
  ChecklistEditLinkProps,
  ImportanceEditSectionProps,
  MyProfileEditContentProps,
  ProfileAvatarSectionProps,
  ProfileEditFieldsProps,
  ProfileForm,
  ProfileViewContentProps,
} from "@/features/mypage/types/myProfileEditContent.types";
export type { MyProfileChecklistFieldMeta } from "@/features/mypage/types/myProfileEditData.types";

export interface MyActivityMatchMock {
  actions: MyRecruitPostActionMock[];
  age: number;
  department: string;
  id: number;
  matchRate: number;
  name: string;
  tags: string[];
}

export interface MyActivityTabMock {
  id: MyActivityTabId;
  label: string;
}

type MyActivityRoomHostMemberMock = {
  id: number;
  isHost: true;
  isMe?: boolean;
  name: string;
  profileImage?: string | null;
};

type MyActivityRoomRegularMemberMock = {
  id: number;
  isHost?: false;
  isMe?: boolean;
  name: string;
  profileImage?: string | null;
};

export type MyActivityRoomMemberMock =
  | MyActivityRoomHostMemberMock
  | MyActivityRoomRegularMemberMock;

export interface MyActivityRoomActionMock {
  id: string;
  label: string;
  tone: MyRecruitPostActionTone;
}

export interface MyActivityRoomMock {
  actions: MyActivityRoomActionMock[];
  dormitory: string;
  id: number;
  members?: MyActivityRoomMemberMock[];
  postId: number;
  roomType: string;
  status: MyActivityRoomStatus;
  statusLabel: string;
  title: string;
  variant: MyActivityRoomVariant;
}

export interface MyChecklistSectionMock {
  helperText?: string;
  id: string;
  options: string[];
  selectedOptions: string[];
  selectionType: MyChecklistSelectionType;
  title: string;
}

export interface MyRecruitPostStatMock {
  id: string;
  label: string;
  value: string;
}

export interface MyRecruitPostActionMock {
  id: string;
  label: string;
  tone: MyRecruitPostActionTone;
}

export interface MyRecruitPostMock {
  actions: MyRecruitPostActionMock[];
  description: string;
  dormitory: string;
  id: number;
  roomType: string;
  stats: MyRecruitPostStatMock[];
  status: MyRecruitPostStatus;
  statusLabel: string;
  title: string;
}

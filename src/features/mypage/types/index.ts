export type MyChecklistSelectionType = "single" | "multi";
export type MyActivityTabId = "posts" | "rooms" | "matches";
export type MyActivityRoomFilterId = "all" | "pending";
export type MyActivityRoomStatus = "joined" | "pending";
export type MyBookmarkPostStatus = "open" | "closed";
export type MyRecruitPostStatus = "open" | "closed";
export type MyRecruitPostActionTone = "neutral" | "primary" | "dark";

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

export interface MyActivityRoomFilterMock {
  id: MyActivityRoomFilterId;
  label: string;
}

export interface MyActivityRoomMemberMock {
  id: number;
  isHost?: boolean;
  name: string;
}

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
  roomType: string;
  status: MyActivityRoomStatus;
  statusLabel: string;
  title: string;
  waitingMessage?: string;
}

export interface MyBookmarkPostMock {
  currentMembers?: string;
  id: number;
  roomType: string;
  status: MyBookmarkPostStatus;
  statusLabel: string;
  title: string;
  weeks: number;
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

export type MyActivityTabId = "posts" | "rooms" | "matches";
export type MyRecruitPostStatus = "open" | "closed";
export type MyRecruitPostActionTone = "neutral" | "primary" | "dark";

export interface MyActivityTabMock {
  id: MyActivityTabId;
  label: string;
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

export const MY_ACTIVITY_ACTIVE_TAB_ID: MyActivityTabId = "posts";

export const MY_ACTIVITY_TABS: MyActivityTabMock[] = [
  { id: "posts", label: "내가 쓴 모집글" },
  { id: "rooms", label: "소속된 방" },
  { id: "matches", label: "1:1 매칭" },
];

export const MY_RECRUIT_POSTS: MyRecruitPostMock[] = [
  {
    actions: [
      { id: "edit", label: "수정하기", tone: "neutral" },
      { id: "applications", label: "신청 관리", tone: "primary" },
    ],
    description: "깔끔한 편이고 조용한 성격입니다.\n서로 적당한 거리감 유지하면서 편하게 지낼분 찾아요",
    dormitory: "2기숙사",
    id: 1,
    roomType: "2인 1실",
    stats: [
      { id: "current-members", label: "현재 인원", value: "2인" },
      { id: "pending-applications", label: "신청 대기", value: "1명" },
    ],
    status: "open",
    statusLabel: "1/2",
    title: "글캠 기숙사 2인실 룸메 구해요!",
  },
  {
    actions: [
      { id: "detail", label: "상세 보기", tone: "neutral" },
      { id: "delete", label: "삭제하기", tone: "dark" },
    ],
    description: "4인실 한 자리 남았습니다!\n아침형 인간이고 청결 중요하게 생각해요.",
    dormitory: "3기숙사",
    id: 2,
    roomType: "4인 1실",
    stats: [
      { id: "current-members", label: "현재 인원", value: "4인" },
      { id: "pending-applications", label: "신청 대기", value: "-" },
    ],
    status: "closed",
    statusLabel: "마감",
    title: "글캠 기숙사 4인실 룸메 구해요!",
  },
];

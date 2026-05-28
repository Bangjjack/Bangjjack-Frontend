import type {
  MyActivityMatchMock,
  MyActivityTabId,
  MyActivityTabMock,
} from "@/features/mypage/types";

export const MY_ACTIVITY_ACTIVE_TAB_ID: MyActivityTabId = "posts";

export const MY_ACTIVITY_TABS: MyActivityTabMock[] = [
  { id: "posts", label: "내가 쓴 모집글" },
  { id: "rooms", label: "소속된 방" },
];

export const MY_ACTIVITY_MATCHES: MyActivityMatchMock[] = [
  {
    actions: [
      { id: "profile", label: "프로필 보기", tone: "neutral" },
      { id: "chat", label: "채팅하기", tone: "primary" },
    ],
    age: 23,
    department: "컴퓨터공학과",
    id: 1,
    matchRate: 92,
    name: "이나연",
    tags: ["아침형", "조용한 편", "비흡연"],
  },
];

export const MY_PROFILE = {
  age: 20,
  birthYear: "2003",
  campus: "글로벌 캠퍼스",
  department: "컴퓨터공학과",
  dormitory: "3 기숙사",
  email: "~~~~@gachon.ac.kr",
  gender: "여성",
  grade: "1",
  name: "무구정광대다라니경",
  semester: "반기 (25주)",
  tags: ["얼리버드", "집순이", "비흡연"],
} as const;

export const MY_PROFILE_SEMESTER_OPTIONS = ["학기 (16주)", "반기 (25주)"] as const;

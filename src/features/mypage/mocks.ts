import type { ChecklistEntry } from "@/features/roommate/types/checklist";
import type {
  MyActivityMatchMock,
  MyActivityTabId,
  MyActivityTabMock,
  MyChecklistSectionMock,
  MyRecruitPostMock,
} from "@/features/mypage/types";

export const MY_CHECKLIST_LAST_UPDATED = "2026.03.25";

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

export const MY_RECRUIT_POST_EMPTY_MESSAGE = [
  "아직 작성된 글이 없어요",
  "먼저 내 룸메이트를 모집해봐요!",
];

export const MY_RECRUIT_POSTS: MyRecruitPostMock[] = [
  {
    actions: [
      { id: "edit", label: "수정하기", tone: "neutral" },
      { id: "applications", label: "삭제하기", tone: "primary" },
    ],
    description:
      "깔끔한 편이고 조용한 성격입니다.\n서로 적당한 거리감 유지하면서 편하게 지낼분 찾아요",
    dormitory: "2기숙사",
    id: 1,
    roomType: "2인 1실",
    stats: [
      { id: "current-members", label: "현재 인원", value: "2" },
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
      { id: "current-members", label: "현재 인원", value: "-" },
    ],
    status: "closed",
    statusLabel: "마감",
    title: "글캠 기숙사 4인실 룸메 구해요!",
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

export const MY_PROFILE_CHECKLIST = [
  { id: "sleep-time", label: "취침 시간", value: "24~2시", isMatched: true },
  { id: "wake-up-time", label: "기상 시간", value: "불규칙", isMatched: true },
  { id: "cleaning-cycle", label: "청소 주기", value: "주 1~2회", isMatched: false },
  { id: "sleeping-habit", label: "잠버릇", value: "없음", isMatched: false },
  { id: "call-habit", label: "통화 습관", value: "소곤소곤", isMatched: true },
  { id: "sleep-time-repeat-1", label: "취침 시간", value: "24~2시", isMatched: true },
  { id: "sleep-time-repeat-2", label: "취침 시간", value: "24~2시", isMatched: true },
] satisfies ChecklistEntry[];

export const MY_CHECKLIST_SECTIONS: MyChecklistSectionMock[] = [
  {
    id: "sleep-time",
    options: ["22시 이전", "22~24시", "24~2시", "2시 이후", "불규칙"],
    selectedOptions: ["24~2시"],
    selectionType: "single",
    title: "취침 시간",
  },
  {
    id: "wake-up-time",
    options: ["6시 이전", "6~8시", "8~10시", "10시 이후", "불규칙"],
    selectedOptions: ["8~10시"],
    selectionType: "single",
    title: "기상 시간",
  },
  {
    helperText: "복수 선택",
    id: "sleeping-habit",
    options: ["없음", "뒤척임", "코골이", "이갈이", "자주 깸"],
    selectedOptions: ["코골이", "자주 깸"],
    selectionType: "multi",
    title: "잠버릇",
  },
  {
    id: "cleaning-cycle",
    options: ["거의 매일", "주 1~2회", "가끔", "거의 안 함"],
    selectedOptions: ["가끔"],
    selectionType: "single",
    title: "청소 주기",
  },
  {
    id: "dorm-stay-duration",
    options: ["대부분 밖에", "절반 정도", "대부분 기숙사 안에"],
    selectedOptions: ["대부분 기숙사 안에"],
    selectionType: "single",
    title: "기숙사 체류 시간",
  },
  {
    id: "noise-sensitivity",
    options: ["둔감한 편", "약간 둔감", "보통", "약간 예민", "예민한 편"],
    selectedOptions: ["예민한 편"],
    selectionType: "single",
    title: "소음 민감도",
  },
  {
    id: "call-habit",
    options: ["기숙사 내부 가능", "밖에서만", "소곤소곤"],
    selectedOptions: ["소곤소곤"],
    selectionType: "single",
    title: "통화 습관",
  },
  {
    id: "indoor-temperature",
    options: ["더위 잘 탐", "추위 잘 탐", "둘 다 예민", "둔감한 편"],
    selectedOptions: ["둘 다 예민"],
    selectionType: "single",
    title: "실내 온도",
  },
  {
    id: "smoking",
    options: ["비흡연", "연초", "전자 담배"],
    selectedOptions: ["전자 담배"],
    selectionType: "single",
    title: "흡연",
  },
];

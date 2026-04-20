import type { ChatDetail, ChatPreview, ChatTab } from "@/features/chat/types";

export const CHAT_TABS: Array<{ key: ChatTab; label: string }> = [
  { key: "all", label: "전체" },
  { key: "roommateRequest", label: "룸메이트 요청" },
];

export const CHAT_PREVIEWS: ChatPreview[] = [
  {
    id: 1,
    nickname: "직지심체요절",
    message: "최근 채팅 내용",
    timeLabel: "방금",
    unreadCount: 101,
    type: "all",
  },
  {
    id: 2,
    nickname: "현실도피자",
    message: "최근 채팅 내용",
    timeLabel: "오전 10:02",
    unreadCount: 3,
    type: "all",
  },
  {
    id: 3,
    nickname: "감자",
    message: "룸메이트 요청이 도착했어요",
    timeLabel: "어제",
    unreadCount: 3,
    type: "roommateRequest",
  },
  {
    id: 4,
    nickname: "고구마",
    message: "최근 채팅 내용",
    timeLabel: "2026-04-10",
    unreadCount: 3,
    type: "all",
  },
];

export const CHAT_HELPER_TEXT = "매칭된 룸메이트에게 먼저 말을 걸어보세요";

export const CHAT_DETAILS: Record<number, ChatDetail> = {
  1: {
    age: 20,
    dateLabel: "2026.04.12",
    department: "컴퓨터공학과",
    id: 1,
    lifestyleTags: ["비흡연", "12시 취침", "주 1~2회 청소"],
    matchRate: 92,
    messages: [
      {
        id: 1,
        sentAt: "오전 9:30",
        text: "안녕하세요. 매칭률이 높게 나와서 연락드렸어요.",
        type: "outgoing",
      },
      {
        id: 2,
        sentAt: "오전 9:31",
        text: "안녕하세요! 저도 방짝에서 룸메이트 찾고 있었어요 :)",
        type: "incoming",
      },
      {
        id: 3,
        sentAt: "오전 9:32",
        text: "저는 비흡연이고 취침 시간은 12시쯤이에요.",
        type: "outgoing",
      },
      {
        id: 4,
        sentAt: "오전 9:32",
        text: "저도 생활 패턴이 비슷한 룸메이트를 찾고 있었어요.",
        type: "outgoing",
      },
      {
        id: 5,
        sentAt: "오전 9:32",
        text: "좋아요!",
        type: "incoming",
      },
    ],
    nickname: "직지심체요절",
    profileSummary: ["학기 16주", "3기숙사", "3인 1실"],
    startSource: "ai_recommendation",
  },
  2: {
    age: 21,
    dateLabel: "2026.04.11",
    department: "글로벌경영학과",
    id: 2,
    lifestyleTags: ["비흡연", "새벽 취침", "깔끔한 편"],
    matchRate: 88,
    messages: [
      {
        id: 1,
        sentAt: "오전 10:02",
        text: "안녕하세요. 프로필 보고 먼저 연락드렸어요.",
        type: "outgoing",
      },
      {
        id: 2,
        sentAt: "오전 10:05",
        text: "반가워요. 생활 패턴이 비슷한 것 같아요.",
        type: "incoming",
      },
    ],
    nickname: "현실도피자",
    profileSummary: ["학기 8주", "2기숙사", "2인 1실"],
    recruitTitle: "글캠 기숙사 2인실 룸메 구해요!",
    startSource: "recruit_post",
  },
  3: {
    age: 20,
    dateLabel: "2026.04.10",
    department: "산업디자인학과",
    id: 3,
    lifestyleTags: ["비흡연", "조용한 편", "주 1회 청소"],
    matchRate: 84,
    messages: [
      {
        id: 1,
        requesterName: "감자",
        type: "roommate_request",
      },
    ],
    nickname: "감자",
    profileSummary: ["학기 12주", "1기숙사", "2인 1실"],
    startSource: "ai_recommendation",
  },
  4: {
    age: 22,
    dateLabel: "2026.04.10",
    department: "미디어커뮤니케이션학과",
    id: 4,
    lifestyleTags: ["흡연 안 함", "아침형", "청소 자주 함"],
    matchRate: 79,
    messages: [
      {
        id: 1,
        sentAt: "2026-04-10",
        text: "안녕하세요. 모집글 보고 연락드려요.",
        type: "incoming",
      },
    ],
    nickname: "고구마",
    profileSummary: ["학기 4주", "3기숙사", "3인 1실"],
    recruitTitle: "메인홀 기숙사 룸메 매칭해요",
    startSource: "recruit_post",
  },
};

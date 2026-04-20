import type { ChatDetail, ChatPreview, ChatTab } from "@/features/chat/types";

export const CHAT_TABS: Array<{ key: ChatTab; label: string }> = [
  { key: "all", label: "전체" },
  { key: "roommateRequest", label: "룸메이트 요청" },
];

export const CHAT_PREVIEWS: ChatPreview[] = [
  {
    id: 1,
    nickname: "무구정광대다라니경",
    message: "최근 채팅 내용",
    timeLabel: "방금",
    unreadCount: 101,
    type: "all",
  },
  {
    id: 2,
    nickname: "현실도 피자",
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
    dateLabel: "2026.04.12",
    id: 1,
    matchRate: 92,
    messages: [
      {
        id: 1,
        sentAt: "오전 9:30",
        text: "안녕하세요! 매칭률이 높게 나와서 연락드렸어요",
        type: "outgoing",
      },
      {
        id: 2,
        sentAt: "오전 9:31",
        text: "안녕하세요! 저도 방짝에서 룸메이트 찾고 있어요:)",
        type: "incoming",
      },
      {
        id: 3,
        sentAt: "오전 9:32",
        text: "네 저도 비흡연이고 취침은 12시쯤이에요!",
        type: "outgoing",
      },
      {
        id: 4,
        sentAt: "오전 9:32",
        text: "잘 맞을 것 같은데 룸메이트 어때요?",
        type: "outgoing",
      },
      {
        id: 5,
        sentAt: "오전 9:32",
        text: "넵 좋아요!",
        type: "incoming",
      },
    ],
    nickname: "무구정광대다라니경",
    profileSummary: ["학기 16주", "3 기숙사", "3인 1실"],
    startSource: "ai_recommendation",
  },
  2: {
    dateLabel: "2026.04.11",
    id: 2,
    matchRate: 88,
    messages: [
      {
        id: 1,
        sentAt: "오전 10:02",
        text: "안녕하세요! 프로필 보고 먼저 연락드렸어요.",
        type: "outgoing",
      },
      {
        id: 2,
        sentAt: "오전 10:05",
        text: "반가워요. 생활 패턴이 비슷한 것 같아요.",
        type: "incoming",
      },
    ],
    nickname: "현실도 피자",
    profileSummary: ["학기 8주", "2 기숙사", "2인 1실"],
    recruitTitle: "글캠 기숙사 2인실 룸메 구해요!",
    startSource: "recruit_post",
  },
  3: {
    dateLabel: "2026.04.10",
    id: 3,
    matchRate: 84,
    messages: [
      {
        id: 1,
        sentAt: "어제",
        text: "룸메이트 요청이 도착했어요.",
        type: "incoming",
      },
    ],
    nickname: "감자",
    profileSummary: ["학기 12주", "1 기숙사", "2인 1실"],
    startSource: "ai_recommendation",
  },
  4: {
    dateLabel: "2026.04.10",
    id: 4,
    matchRate: 79,
    messages: [
      {
        id: 1,
        sentAt: "2026-04-10",
        text: "안녕하세요! 대화 나눠보고 싶어요.",
        type: "incoming",
      },
    ],
    nickname: "고구마",
    profileSummary: ["학기 4주", "3 기숙사", "3인 1실"],
    recruitTitle: "메인홀 기숙사 룸메 매칭해요",
    startSource: "recruit_post",
  },
};

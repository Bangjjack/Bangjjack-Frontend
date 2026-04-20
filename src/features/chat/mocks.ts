import type { ChatPreview, ChatTab } from "@/features/chat/types";

export const CHAT_TABS: Array<{ key: ChatTab; label: string }> = [
  { key: "all", label: "전체" },
  { key: "roommateRequest", label: "룸메이트 요청" },
];

export const CHAT_PREVIEWS: ChatPreview[] = [
  {
    id: 1,
    nickname: "옥수수 수염차",
    message: "최근 채팅 내용",
    timeLabel: "방금",
    unreadCount: 99,
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

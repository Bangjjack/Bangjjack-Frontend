export type ChatTab = "all" | "roommateRequest";

export type ChatPreview = {
  id: number;
  message: string;
  nickname: string;
  timeLabel: string;
  type: ChatTab;
  unreadCount: number;
};

export type ChatMessage = {
  id: number;
  sentAt: string;
  text: string;
  type: "incoming" | "outgoing";
};

export type ChatStartSource = "ai_recommendation" | "recruit_post";

export type ChatDetail = {
  dateLabel: string;
  id: number;
  matchRate: number;
  messages: ChatMessage[];
  nickname: string;
  profileSummary: string[];
  recruitTitle?: string;
  startSource: ChatStartSource;
};

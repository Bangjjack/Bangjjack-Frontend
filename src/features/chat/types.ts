export type ChatTab = "all" | "roommateRequest";

export type ChatPreview = {
  id: number;
  message: string;
  nickname: string;
  timeLabel: string;
  type: ChatTab;
  unreadCount: number;
};

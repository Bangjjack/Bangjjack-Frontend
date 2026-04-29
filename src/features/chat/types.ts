import type { ComponentType, SVGProps } from "react";

export type ChatTab = "all" | "roommateRequest";

export type ChatPreview = {
  id: number;
  message: string;
  nickname: string;
  timeLabel: string;
  type: ChatTab;
  unreadCount: number;
};

export type ChatUserProfile = {
  age?: number;
  department?: string;
  matchRate?: number;
  nickname: string;
};

export type BaseChatCardProps = {
  className?: string;
  matchRate: number;
  profileSummary: string[];
};

export type ChatTextMessage = {
  id: number;
  sentAt: string;
  text: string;
  type: "incoming" | "outgoing";
};

export type ChatRoommateRequestMessageData = {
  id: number;
  requesterName: string;
  sentAt?: string;
  type: "roommate_request";
};

export type ChatRoommateInviteMessageData = {
  id: number;
  recipientName: string;
  type: "roommate_invite";
};

export type ChatMessage =
  | ChatTextMessage
  | ChatRoommateRequestMessageData
  | ChatRoommateInviteMessageData;

export type ChatStartSource = "ai_recommendation" | "recruit_post";

export type ChatInputMenuAction = "invite";

export type ChatInputMenuItem = {
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconBackgroundClassName: string;
  iconClassName: string;
  id: ChatInputMenuAction;
  title: string;
};

export type ChatDetail = ChatUserProfile & {
  dateLabel: string;
  id: number;
  lifestyleTags?: string[];
  matchRate: number;
  messages: ChatMessage[];
  profileSummary: string[];
  recruitTitle?: string;
  startSource: ChatStartSource;
};

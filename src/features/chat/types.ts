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

export type ChatMessage = {
  id: number;
  sentAt: string;
  text: string;
  type: "incoming" | "outgoing";
};

export type ChatStartSource = "ai_recommendation" | "recruit_post";

export type ChatInputMenuAction = "invite" | "photo";

export type ChatInputMenuItem = {
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconBackgroundClassName: string;
  iconClassName: string;
  id: ChatInputMenuAction;
  title: string;
};

export type ChatDetail = {
  age?: number;
  dateLabel: string;
  department?: string;
  id: number;
  lifestyleTags?: string[];
  matchRate: number;
  messages: ChatMessage[];
  nickname: string;
  profileSummary: string[];
  recruitTitle?: string;
  startSource: ChatStartSource;
};

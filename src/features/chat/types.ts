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
  messageType?: ChatServerMessageType;
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
  recruitPostId?: number;
  recruitTitle?: string;
  startSource: ChatStartSource;
};

export type CreateChatRoomRequest = {
  targetUserId: number;
};

export type ChatRoomParticipant = {
  userId: number;
};

export type ChatRoom = {
  createdAt: string;
  isNewRoom: boolean;
  participants: ChatRoomParticipant[];
  roomId: number;
  roomType: string;
};

export type ChatClientMessageType = "SUBSCRIBE" | "UNSUBSCRIBE" | "SEND";

export type ChatServerMessageType =
  | "USER"
  | "APPLICATION_SENT"
  | "APPLICATION_ACCEPTED"
  | "APPLICATION_REJECTED"
  | "GROUP_DISBANDED"
  | "SYSTEM";

export type ChatSendMessagePayload = {
  content: string;
  roomId: number;
  type: "SEND";
};

export type ChatReceivedMessage = {
  content: string;
  createdAt: string;
  messageId: number;
  messageType: ChatServerMessageType;
  roomId: number;
  senderId: number;
};

export type ChatErrorMessage = {
  code: number;
  message: string;
  type: "ERROR";
};

export type ChatConnectionStatus = "idle" | "connecting" | "open" | "closed" | "error";

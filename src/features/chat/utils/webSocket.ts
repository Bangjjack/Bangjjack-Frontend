import { WS_BASE_URL } from "@/constants";
import type {
  ChatErrorMessage,
  ChatReadReceiptMessage,
  ChatReceivedMessage,
  ChatServerMessageType,
} from "@/features/chat/types";

const VALID_MESSAGE_TYPES = [
  "USER",
  "APPLICATION_SENT",
  "APPLICATION_ACCEPTED",
  "APPLICATION_REJECTED",
  "GROUP_DISBANDED",
  "SYSTEM",
] satisfies ChatServerMessageType[];

const createUrlWithToken = (baseUrl: string, wsToken: string) => {
  const url = new URL(baseUrl);
  url.search = new URLSearchParams({ token: wsToken }).toString();

  return url.toString();
};

export const createChatWebSocketUrls = (wsToken: string) => {
  return [createUrlWithToken(WS_BASE_URL, wsToken)];
};

export const isChatErrorMessage = (value: unknown): value is ChatErrorMessage => {
  if (typeof value !== "object" || value == null) {
    return false;
  }

  const message = value as Partial<ChatErrorMessage>;
  return message.type === "ERROR" && typeof message.code === "number";
};

export const isChatReceivedMessage = (value: unknown): value is ChatReceivedMessage => {
  if (typeof value !== "object" || value == null) {
    return false;
  }

  const message = value as Partial<ChatReceivedMessage>;

  return (
    message.type === "CHAT_MESSAGE" &&
    typeof message.messageId === "number" &&
    typeof message.roomId === "number" &&
    typeof message.senderId === "number" &&
    typeof message.content === "string" &&
    isChatServerMessageType(message.messageType) &&
    typeof message.createdAt === "string"
  );
};

export const isChatReadReceiptMessage = (value: unknown): value is ChatReadReceiptMessage => {
  if (typeof value !== "object" || value == null) {
    return false;
  }

  const message = value as Partial<ChatReadReceiptMessage>;

  return (
    message.type === "READ_RECEIPT" &&
    typeof message.roomId === "number" &&
    typeof message.readerId === "number" &&
    typeof message.lastReadMessageId === "number" &&
    typeof message.readAt === "string"
  );
};

const isChatServerMessageType = (value: unknown): value is ChatServerMessageType => {
  return typeof value === "string" && VALID_MESSAGE_TYPES.includes(value as ChatServerMessageType);
};

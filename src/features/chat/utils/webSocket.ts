import { API_BASE_URL, WS_BASE_URL } from "@/constants";
import type { ChatErrorMessage, ChatReceivedMessage } from "@/features/chat/types";

const createUrlWithToken = (baseUrl: string, wsToken: string) => {
  const url = new URL(baseUrl);
  url.search = new URLSearchParams({ token: wsToken }).toString();

  return url.toString();
};

const createUrlFromApiBase = (wsToken: string, protocol: "ws:" | "wss:") => {
  const apiUrl = new URL(API_BASE_URL);
  apiUrl.protocol = protocol;
  apiUrl.pathname = "/ws/chat";
  apiUrl.search = new URLSearchParams({ token: wsToken }).toString();

  return apiUrl.toString();
};

export const createChatWebSocketUrls = (wsToken: string) => {
  if (WS_BASE_URL) {
    return [createUrlWithToken(WS_BASE_URL, wsToken)];
  }

  const apiUrl = new URL(API_BASE_URL);
  const preferredProtocol = apiUrl.protocol === "https:" ? "wss:" : "ws:";
  const fallbackProtocol = preferredProtocol === "wss:" ? "ws:" : "wss:";
  const fallbackPortUrl = new URL(API_BASE_URL);
  fallbackPortUrl.protocol = "ws:";
  fallbackPortUrl.port = "8080";
  fallbackPortUrl.pathname = "/ws/chat";
  fallbackPortUrl.search = new URLSearchParams({ token: wsToken }).toString();

  return Array.from(
    new Set([
      createUrlFromApiBase(wsToken, preferredProtocol),
      createUrlFromApiBase(wsToken, fallbackProtocol),
      fallbackPortUrl.toString(),
    ]),
  );
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
    typeof message.messageId === "number" &&
    typeof message.roomId === "number" &&
    typeof message.senderId === "number" &&
    typeof message.content === "string" &&
    typeof message.messageType === "string" &&
    typeof message.createdAt === "string"
  );
};

import type { ChatMessage, ChatMessageHistoryItem } from "@/features/chat/types";
import { formatMessageDateLabel, formatMessageTime } from "@/features/chat/utils";

export function mapHistoryMessageToChatMessage(
  message: ChatMessageHistoryItem,
  currentUserId: number | null,
): ChatMessage {
  const { dateKey, dateLabel } = formatMessageDateLabel(message.createdAt);

  return {
    dateKey,
    dateLabel,
    id: message.messageId,
    sentAt: formatMessageTime(message.createdAt),
    text: message.content,
    type: currentUserId != null && message.senderId === currentUserId ? "outgoing" : "incoming",
  };
}

export function compareHistoryMessageByCreatedAt(
  firstMessage: ChatMessageHistoryItem,
  secondMessage: ChatMessageHistoryItem,
) {
  const firstCreatedAt = new Date(firstMessage.createdAt).getTime();
  const secondCreatedAt = new Date(secondMessage.createdAt).getTime();

  if (Number.isNaN(firstCreatedAt) || Number.isNaN(secondCreatedAt)) {
    return firstMessage.messageId - secondMessage.messageId;
  }

  return firstCreatedAt - secondCreatedAt;
}

export function mapHistoryMessagesToChatMessages(
  messages: ChatMessageHistoryItem[],
  currentUserId: number | null,
) {
  return messages
    .toSorted(compareHistoryMessageByCreatedAt)
    .map((message) => mapHistoryMessageToChatMessage(message, currentUserId));
}

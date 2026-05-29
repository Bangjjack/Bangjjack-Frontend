import type { ChatMessage, ChatMessageHistoryItem } from "@/features/chat/types";
import { formatMessageDateLabel, formatMessageTime } from "@/features/chat/utils";

export function mapHistoryMessageToChatMessage(
  message: ChatMessageHistoryItem,
  currentUserId: number | null,
  partnerName: string,
): ChatMessage {
  const { dateKey, dateLabel } = formatMessageDateLabel(message.createdAt);
  const isOutgoing = currentUserId != null && message.senderId === currentUserId;

  if (message.messageType === "APPLICATION_SENT") {
    if (isOutgoing) {
      return {
        applicationId: message.applicationId,
        dateKey,
        dateLabel,
        id: message.messageId,
        recipientName: partnerName,
        type: "roommate_invite",
      };
    }

    return {
      applicationId: message.applicationId,
      dateKey,
      dateLabel,
      id: message.messageId,
      requesterName: partnerName,
      sentAt: formatMessageTime(message.createdAt),
      type: "roommate_request",
    };
  }

  if (message.messageType === "APPLICATION_REJECTED") {
    return {
      applicationId: message.applicationId,
      dateKey,
      dateLabel,
      id: message.messageId,
      partnerName,
      sentAt: formatMessageTime(message.createdAt),
      type: "roommate_reject",
      variant: isOutgoing ? "sent" : "received",
    };
  }

  if (message.messageType === "APPLICATION_ACCEPTED") {
    return {
      applicationId: message.applicationId,
      dateKey,
      dateLabel,
      id: message.messageId,
      partnerName,
      sentAt: formatMessageTime(message.createdAt),
      type: "roommate_accept",
      variant: isOutgoing ? "sent" : "received",
    };
  }

  if (message.messageType === "APPLICATION_CANCELLED") {
    return {
      applicationId: message.applicationId,
      dateKey,
      dateLabel,
      id: message.messageId,
      partnerName,
      sentAt: formatMessageTime(message.createdAt),
      type: "roommate_cancel",
      variant: isOutgoing ? "sent" : "received",
    };
  }

  return {
    dateKey,
    dateLabel,
    id: message.messageId,
    sentAt: formatMessageTime(message.createdAt),
    text: message.content,
    type: isOutgoing ? "outgoing" : "incoming",
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
  partnerName: string,
) {
  const sortedMessages = messages.toSorted(compareHistoryMessageByCreatedAt);

  return sortedMessages.map((message) =>
    mapHistoryMessageToChatMessage(message, currentUserId, partnerName),
  );
}

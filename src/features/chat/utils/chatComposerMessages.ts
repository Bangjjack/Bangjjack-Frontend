import type {
  ChatMessage,
  ChatReceivedMessage,
  ChatRoommateInviteMessageData,
} from "@/features/chat/types";
import { formatMessageDateLabel, formatMessageTime } from "@/features/chat/utils";

type RoommateResultMessageType = "roommate_accept" | "roommate_reject" | "roommate_cancel";
type RoommateResultMessageVariant = "received" | "sent";

export function createInviteMessage({
  applicationId,
  createdAt,
  id,
  recipientName,
}: {
  applicationId?: number;
  createdAt: string;
  id: number;
  recipientName: string;
}): ChatMessage {
  return {
    applicationId,
    ...formatMessageDateLabel(createdAt),
    id,
    recipientName,
    type: "roommate_invite",
  };
}

function createRoommateRequestMessage({
  applicationId,
  createdAt,
  id,
  requesterName,
}: {
  applicationId?: number;
  createdAt: string;
  id: number;
  requesterName: string;
}): ChatMessage {
  return {
    applicationId,
    ...formatMessageDateLabel(createdAt),
    id,
    requesterName,
    sentAt: formatMessageTime(createdAt),
    type: "roommate_request",
  };
}

export function createRoommateResultMessage({
  applicationId,
  createdAt,
  id,
  partnerName,
  type,
  variant,
}: {
  applicationId?: number;
  createdAt: string;
  id: number;
  partnerName: string;
  type: RoommateResultMessageType;
  variant: RoommateResultMessageVariant;
}): ChatMessage {
  return {
    applicationId,
    ...formatMessageDateLabel(createdAt),
    id,
    partnerName,
    sentAt: formatMessageTime(createdAt),
    type,
    variant,
  };
}

function createTextMessage({
  isOutgoing,
  receivedMessage,
}: {
  isOutgoing: boolean;
  receivedMessage: ChatReceivedMessage;
}): ChatMessage {
  return {
    ...formatMessageDateLabel(receivedMessage.createdAt),
    id: receivedMessage.messageId,
    messageType: receivedMessage.messageType,
    sentAt: formatMessageTime(receivedMessage.createdAt),
    text: receivedMessage.content,
    type: isOutgoing ? "outgoing" : "incoming",
  };
}

export function createReceivedChatMessage({
  isOutgoing,
  partnerName,
  receivedMessage,
}: {
  isOutgoing: boolean;
  partnerName: string;
  receivedMessage: ChatReceivedMessage;
}): ChatMessage {
  const variant = isOutgoing ? "sent" : "received";

  if (receivedMessage.messageType === "APPLICATION_SENT") {
    return isOutgoing
      ? createInviteMessage({
          applicationId: receivedMessage.applicationId,
          createdAt: receivedMessage.createdAt,
          id: receivedMessage.messageId,
          recipientName: partnerName,
        })
      : createRoommateRequestMessage({
          applicationId: receivedMessage.applicationId,
          createdAt: receivedMessage.createdAt,
          id: receivedMessage.messageId,
          requesterName: partnerName,
        });
  }

  if (receivedMessage.messageType === "APPLICATION_REJECTED") {
    return createRoommateResultMessage({
      applicationId: receivedMessage.applicationId,
      createdAt: receivedMessage.createdAt,
      id: receivedMessage.messageId,
      partnerName,
      type: "roommate_reject",
      variant,
    });
  }

  if (receivedMessage.messageType === "APPLICATION_ACCEPTED") {
    return createRoommateResultMessage({
      applicationId: receivedMessage.applicationId,
      createdAt: receivedMessage.createdAt,
      id: receivedMessage.messageId,
      partnerName,
      type: "roommate_accept",
      variant,
    });
  }

  if (receivedMessage.messageType === "APPLICATION_CANCELLED") {
    return createRoommateResultMessage({
      applicationId: receivedMessage.applicationId,
      createdAt: receivedMessage.createdAt,
      id: receivedMessage.messageId,
      partnerName,
      type: "roommate_cancel",
      variant,
    });
  }

  return createTextMessage({ isOutgoing, receivedMessage });
}

export function getNextMessageId(messages: ChatMessage[]) {
  return Math.max(0, ...messages.map((message) => message.id)) + 1;
}

export function isInviteMessage(message: ChatMessage): message is ChatRoommateInviteMessageData {
  return message.type === "roommate_invite";
}

export function hasRoommateApplicationMessage(messages: ChatMessage[], isOutgoing: boolean) {
  return messages.some((message) =>
    isOutgoing ? message.type === "roommate_invite" : message.type === "roommate_request",
  );
}

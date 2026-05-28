import type { ChatMessage, ChatTextMessage } from "@/features/chat/types";

export function getMessageDateBadgeLabels(messages: ChatMessage[], fallbackDateLabel: string) {
  let previousDateKey: string | undefined;

  return messages.map((message) => {
    const messageDateKey = message.dateKey ?? fallbackDateLabel;
    const messageDateLabel = message.dateLabel ?? fallbackDateLabel;

    if (messageDateKey === previousDateKey) {
      return null;
    }

    previousDateKey = messageDateKey;
    return messageDateLabel;
  });
}

export function isTextMessage(message: ChatMessage): message is ChatTextMessage {
  return message.type === "outgoing" || message.type === "incoming";
}

export function shouldShowMessageTime(messages: ChatMessage[], index: number) {
  const message = messages[index];
  const nextMessage = messages[index + 1];

  if (!message || !isTextMessage(message)) {
    return false;
  }

  if (!nextMessage || !isTextMessage(nextMessage)) {
    return true;
  }

  return !isSameMessageTimeGroup(message, nextMessage);
}

export function isSameMessageTimeGroupWithPrevious(messages: ChatMessage[], index: number) {
  const message = messages[index];
  const previousMessage = messages[index - 1];

  if (!message || !previousMessage || !isTextMessage(message) || !isTextMessage(previousMessage)) {
    return false;
  }

  return isSameMessageTimeGroup(previousMessage, message);
}

function isSameMessageTimeGroup(message: ChatTextMessage, otherMessage: ChatTextMessage) {
  const messageDateKey = message.dateKey ?? message.dateLabel ?? "";
  const otherMessageDateKey = otherMessage.dateKey ?? otherMessage.dateLabel ?? "";

  return (
    message.type === otherMessage.type &&
    message.sentAt === otherMessage.sentAt &&
    messageDateKey === otherMessageDateKey
  );
}

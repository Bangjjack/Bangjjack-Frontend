import { ChatMessageItem } from "@/features/chat/components/chat-detail/ChatMessageItem";
import type { ChatMessage } from "@/features/chat/types";
import {
  getMessageDateBadgeLabels,
  isSameMessageTimeGroupWithPrevious,
} from "@/features/chat/utils/chatMessageGrouping";

export type ChatMessageListProps = {
  avatarSeed: number;
  fallbackDateLabel: string;
  messages: ChatMessage[];
  onCancelInviteRequest: (messageId: number) => void;
  onRoommateRequestAccept?: () => void;
};

export function ChatMessageList({
  avatarSeed,
  fallbackDateLabel,
  messages,
  onCancelInviteRequest,
  onRoommateRequestAccept,
}: ChatMessageListProps) {
  const dateBadgeLabels = getMessageDateBadgeLabels(messages, fallbackDateLabel);

  return (
    <div className="flex flex-col">
      {messages.map((message, index) => (
        <ChatMessageItem
          key={message.id}
          avatarSeed={avatarSeed}
          compactSpacing={isSameMessageTimeGroupWithPrevious(messages, index)}
          dateBadgeLabel={dateBadgeLabels[index]}
          isFirst={index === 0}
          message={message}
          messages={messages}
          messageIndex={index}
          onCancelInviteRequest={onCancelInviteRequest}
          onRoommateRequestAccept={onRoommateRequestAccept}
        />
      ))}
    </div>
  );
}

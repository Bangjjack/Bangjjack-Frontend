import { ChatMessageItem } from "@/features/chat/components/chat-detail/ChatMessageItem";
import type { ChatMessage } from "@/features/chat/types";
import {
  getMessageDateBadgeLabels,
  isSameMessageTimeGroupWithPrevious,
} from "@/features/chat/utils/chatMessageGrouping";

export type ChatMessageListProps = {
  avatarImageUrl?: string | null;
  avatarSeed: number;
  fallbackDateLabel: string;
  messages: ChatMessage[];
  onCancelInviteRequest: (messageId: number) => void;
  onRoommateRequestAccept?: (applicationId?: number) => void;
  onRoommateRequestReject?: (applicationId?: number) => void;
  isProcessingRoommateRequest?: boolean;
};

export function ChatMessageList({
  avatarImageUrl,
  avatarSeed,
  fallbackDateLabel,
  messages,
  onCancelInviteRequest,
  isProcessingRoommateRequest,
  onRoommateRequestAccept,
  onRoommateRequestReject,
}: ChatMessageListProps) {
  const dateBadgeLabels = getMessageDateBadgeLabels(messages, fallbackDateLabel);

  return (
    <div className="flex flex-col">
      {messages.map((message, index) => (
        <ChatMessageItem
          key={message.id}
          avatarImageUrl={avatarImageUrl}
          avatarSeed={avatarSeed}
          compactSpacing={isSameMessageTimeGroupWithPrevious(messages, index)}
          dateBadgeLabel={dateBadgeLabels[index]}
          isFirst={index === 0}
          message={message}
          messages={messages}
          messageIndex={index}
          onCancelInviteRequest={onCancelInviteRequest}
          isProcessingRoommateRequest={isProcessingRoommateRequest}
          onRoommateRequestAccept={onRoommateRequestAccept}
          onRoommateRequestReject={onRoommateRequestReject}
        />
      ))}
    </div>
  );
}

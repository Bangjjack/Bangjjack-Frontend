import { ChatMessageItem } from "@/features/chat/components/chat-detail/ChatMessageItem";
import type { ChatDetail, ChatMessage } from "@/features/chat/types";
import {
  getMessageDateBadgeLabels,
  isSameMessageTimeGroupWithPrevious,
} from "@/features/chat/utils/chatMessageGrouping";

export type ChatMessageListProps = {
  avatarImageUrl?: string | null;
  avatarSeed: number;
  chatDetail: ChatDetail;
  fallbackDateLabel: string;
  isCancelingInviteRequest?: boolean;
  messages: ChatMessage[];
  onCancelInviteRequest: (messageId: number) => void;
  onRoommateRequestAccept?: (applicationId?: number) => void;
  onRoommateRequestReject?: (applicationId?: number) => void;
  partnerLastReadMessageId?: number | null;
  isProcessingRoommateRequest?: boolean;
};

export function ChatMessageList({
  avatarImageUrl,
  avatarSeed,
  chatDetail,
  fallbackDateLabel,
  isCancelingInviteRequest,
  messages,
  onCancelInviteRequest,
  isProcessingRoommateRequest,
  onRoommateRequestAccept,
  onRoommateRequestReject,
  partnerLastReadMessageId,
}: ChatMessageListProps) {
  const dateBadgeLabels = getMessageDateBadgeLabels(messages, fallbackDateLabel);

  return (
    <div className="flex flex-col">
      {messages.map((message, index) => (
        <ChatMessageItem
          key={message.id}
          avatarImageUrl={avatarImageUrl}
          avatarSeed={avatarSeed}
          chatDetail={chatDetail}
          compactSpacing={isSameMessageTimeGroupWithPrevious(messages, index)}
          dateBadgeLabel={dateBadgeLabels[index]}
          isFirst={index === 0}
          message={message}
          messages={messages}
          messageIndex={index}
          isCancelingInviteRequest={isCancelingInviteRequest}
          onCancelInviteRequest={onCancelInviteRequest}
          isProcessingRoommateRequest={isProcessingRoommateRequest}
          onRoommateRequestAccept={onRoommateRequestAccept}
          onRoommateRequestReject={onRoommateRequestReject}
          partnerLastReadMessageId={partnerLastReadMessageId}
        />
      ))}
    </div>
  );
}

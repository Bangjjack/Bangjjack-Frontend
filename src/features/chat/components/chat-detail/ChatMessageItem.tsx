import { ChatRoommateAcceptMessageItem } from "@/features/chat/components/chat-detail/ChatRoommateAcceptMessageItem";
import { ChatRoommateCancelMessageItem } from "@/features/chat/components/chat-detail/ChatRoommateCancelMessageItem";
import { ChatRoommateInviteMessageItem } from "@/features/chat/components/chat-detail/ChatRoommateInviteMessageItem";
import { ChatRoommateRejectMessageItem } from "@/features/chat/components/chat-detail/ChatRoommateRejectMessageItem";
import { ChatRoommateRequestMessageItem } from "@/features/chat/components/chat-detail/ChatRoommateRequestMessageItem";
import { ChatTextMessageItem } from "@/features/chat/components/chat-detail/ChatTextMessageItem";
import { ChatMessageWrapper } from "@/features/chat/components/chat-detail/ChatMessageWrapper";
import type { ChatDetail, ChatMessage } from "@/features/chat/types";
import { shouldShowMessageTime } from "@/features/chat/utils/chatMessageGrouping";

export type ChatMessageItemProps = {
  avatarImageUrl?: string | null;
  avatarSeed: number;
  chatDetail: ChatDetail;
  compactSpacing: boolean;
  dateBadgeLabel?: string | null;
  isCancelingInviteRequest?: boolean;
  isFirst: boolean;
  isSendingResendRequest?: boolean;
  message: ChatMessage;
  messages: ChatMessage[];
  messageIndex: number;
  onCancelInviteRequest: (messageId: number) => void;
  onResendInviteRequest?: () => void;
  onRoommateRequestAccept?: (applicationId?: number) => void;
  onRoommateRequestReject?: (applicationId?: number) => void;
  partnerLastReadMessageId?: number | null;
  isProcessingRoommateRequest?: boolean;
};

export function ChatMessageItem({
  avatarImageUrl,
  avatarSeed,
  chatDetail,
  compactSpacing,
  dateBadgeLabel,
  isCancelingInviteRequest,
  isFirst,
  message,
  messages,
  messageIndex,
  onCancelInviteRequest,
  onResendInviteRequest,
  isProcessingRoommateRequest,
  onRoommateRequestAccept,
  onRoommateRequestReject,
  partnerLastReadMessageId,
}: ChatMessageItemProps) {
  if (message.type === "roommate_request") {
    return (
      <ChatMessageWrapper dateBadgeLabel={dateBadgeLabel} isFirst={isFirst}>
        <ChatRoommateRequestMessageItem
          avatarImageUrl={avatarImageUrl}
          avatarSeed={avatarSeed}
          isProcessing={isProcessingRoommateRequest}
          message={message}
          onAccept={onRoommateRequestAccept}
          onReject={onRoommateRequestReject}
        />
      </ChatMessageWrapper>
    );
  }

  if (message.type === "roommate_invite") {
    return (
      <ChatMessageWrapper dateBadgeLabel={dateBadgeLabel} isFirst={isFirst}>
        <ChatRoommateInviteMessageItem
          isCanceling={isCancelingInviteRequest}
          message={message}
          onCancel={onCancelInviteRequest}
        />
      </ChatMessageWrapper>
    );
  }

  if (message.type === "roommate_reject") {
    return (
      <ChatMessageWrapper dateBadgeLabel={dateBadgeLabel} isFirst={isFirst}>
        <ChatRoommateRejectMessageItem
          avatarImageUrl={avatarImageUrl}
          avatarSeed={avatarSeed}
          message={message}
        />
      </ChatMessageWrapper>
    );
  }

  if (message.type === "roommate_accept") {
    return (
      <ChatMessageWrapper dateBadgeLabel={dateBadgeLabel} isFirst={isFirst}>
        <ChatRoommateAcceptMessageItem
          avatarImageUrl={avatarImageUrl}
          avatarSeed={avatarSeed}
          chatDetail={chatDetail}
          message={message}
        />
      </ChatMessageWrapper>
    );
  }

  if (message.type === "roommate_cancel") {
    return (
      <ChatMessageWrapper dateBadgeLabel={dateBadgeLabel} isFirst={isFirst}>
        <ChatRoommateCancelMessageItem
          avatarImageUrl={avatarImageUrl}
          avatarSeed={avatarSeed}
          message={message}
          onResend={onResendInviteRequest}
        />
      </ChatMessageWrapper>
    );
  }

  return (
    <ChatMessageWrapper
      compactSpacing={compactSpacing}
      dateBadgeLabel={dateBadgeLabel}
      isFirst={isFirst}
    >
      <ChatTextMessageItem
        avatarImageUrl={avatarImageUrl}
        avatarSeed={avatarSeed}
        compactSpacing={compactSpacing}
        message={message}
        partnerLastReadMessageId={partnerLastReadMessageId}
        showMessageTime={shouldShowMessageTime(messages, messageIndex)}
      />
    </ChatMessageWrapper>
  );
}

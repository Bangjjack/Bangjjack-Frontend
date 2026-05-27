import { ProfileAvatar } from "@/components/ui";
import { ChatRoommateInviteMessage } from "@/features/chat/components/chat-detail/ChatRoommateInviteMessage";
import { ChatRoommateRequestMessage } from "@/features/chat/components/chat-detail/ChatRoommateRequestMessage";
import { ChatMessageWrapper } from "@/features/chat/components/chat-detail/ChatMessageWrapper";
import type { ChatMessage, ChatTextMessage } from "@/features/chat/types";
import { shouldShowMessageTime } from "@/features/chat/utils/chatMessageGrouping";
import { cn } from "@/lib/cn";

export type ChatMessageItemProps = {
  avatarImageUrl?: string | null;
  avatarSeed: number;
  compactSpacing: boolean;
  dateBadgeLabel?: string | null;
  isFirst: boolean;
  message: ChatMessage;
  messages: ChatMessage[];
  messageIndex: number;
  onCancelInviteRequest: (messageId: number) => void;
  onRoommateRequestAccept?: (applicationId?: number) => void;
  onRoommateRequestReject?: (applicationId?: number) => void;
  isProcessingRoommateRequest?: boolean;
};

export function ChatMessageItem({
  avatarImageUrl,
  avatarSeed,
  compactSpacing,
  dateBadgeLabel,
  isFirst,
  message,
  messages,
  messageIndex,
  onCancelInviteRequest,
  isProcessingRoommateRequest,
  onRoommateRequestAccept,
  onRoommateRequestReject,
}: ChatMessageItemProps) {
  if (message.type === "roommate_request") {
    return (
      <ChatMessageWrapper dateBadgeLabel={dateBadgeLabel} isFirst={isFirst}>
        <RoommateRequestMessageItem
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
        <RoommateInviteMessageItem message={message} onCancel={onCancelInviteRequest} />
      </ChatMessageWrapper>
    );
  }

  return (
    <ChatMessageWrapper
      compactSpacing={compactSpacing}
      dateBadgeLabel={dateBadgeLabel}
      isFirst={isFirst}
    >
      <TextMessageItem
        avatarImageUrl={avatarImageUrl}
        avatarSeed={avatarSeed}
        compactSpacing={compactSpacing}
        message={message}
        showMessageTime={shouldShowMessageTime(messages, messageIndex)}
      />
    </ChatMessageWrapper>
  );
}

function RoommateRequestMessageItem({
  avatarImageUrl,
  avatarSeed,
  message,
  isProcessing,
  onAccept,
  onReject,
}: {
  avatarImageUrl?: string | null;
  avatarSeed: number;
  isProcessing?: boolean;
  message: Extract<ChatMessage, { type: "roommate_request" }>;
  onAccept?: (applicationId?: number) => void;
  onReject?: (applicationId?: number) => void;
}) {
  return (
    <div className="flex w-full items-end gap-200">
      <ProfileAvatar
        className="shrink-0 self-end"
        imageUrl={avatarImageUrl}
        seed={avatarSeed}
        size={36}
      />
      <ChatRoommateRequestMessage
        isProcessing={isProcessing}
        onAccept={() => onAccept?.(message.applicationId)}
        onReject={() => onReject?.(message.applicationId)}
        requesterName={message.requesterName}
      />
      {message.sentAt ? (
        <span className="shrink-0 whitespace-nowrap typo-caption4 text-text-disabled">
          {message.sentAt}
        </span>
      ) : null}
    </div>
  );
}

function RoommateInviteMessageItem({
  message,
  onCancel,
}: {
  message: Extract<ChatMessage, { type: "roommate_invite" }>;
  onCancel: (messageId: number) => void;
}) {
  return (
    <div className="flex w-full justify-end">
      <ChatRoommateInviteMessage
        onCancel={() => onCancel(message.id)}
        recipientName={message.recipientName}
      />
    </div>
  );
}

function TextMessageItem({
  avatarImageUrl,
  avatarSeed,
  compactSpacing,
  message,
  showMessageTime,
}: {
  avatarImageUrl?: string | null;
  avatarSeed: number;
  compactSpacing: boolean;
  message: ChatTextMessage;
  showMessageTime: boolean;
}) {
  const isOutgoing = message.type === "outgoing";
  const showProfile = !isOutgoing && !compactSpacing;

  return (
    <div className={cn("flex w-full items-end gap-200", isOutgoing && "justify-end")}>
      {!isOutgoing ? (
        <ProfileAvatar
          className={cn("shrink-0 self-end", !showProfile && "invisible")}
          imageUrl={avatarImageUrl}
          seed={avatarSeed}
          size={36}
        />
      ) : null}

      {!isOutgoing ? (
        <div className="max-w-55 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-bg-secondary px-300 py-300">
          <p className="whitespace-pre-wrap wrap-break-word typo-caption2 text-text-alternative">
            {message.text}
          </p>
        </div>
      ) : null}

      {showMessageTime ? (
        <span className="typo-caption4 text-text-disabled">{message.sentAt}</span>
      ) : null}

      {isOutgoing ? (
        <div className="max-w-55 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-brand-primary px-300 py-300">
          <p className="whitespace-pre-wrap wrap-break-word typo-caption2 text-text-on-primary">
            {message.text}
          </p>
        </div>
      ) : null}
    </div>
  );
}

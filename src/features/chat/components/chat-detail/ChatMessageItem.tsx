import { ProfileAvatar } from "@/components/ui";
import { ChatRoommateInviteMessage } from "@/features/chat/components/ChatRoommateInviteMessage";
import { ChatRoommateRequestMessage } from "@/features/chat/components/ChatRoommateRequestMessage";
import { ChatMessageWrapper } from "@/features/chat/components/chat-detail/ChatMessageWrapper";
import type { ChatMessage, ChatTextMessage } from "@/features/chat/types";
import { shouldShowMessageTime } from "@/features/chat/utils/chatMessageGrouping";
import { cn } from "@/lib/cn";

export type ChatMessageItemProps = {
  avatarSeed: number;
  compactSpacing: boolean;
  dateBadgeLabel?: string | null;
  isFirst: boolean;
  message: ChatMessage;
  messages: ChatMessage[];
  messageIndex: number;
  onCancelInviteRequest: (messageId: number) => void;
  onRoommateRequestAccept?: () => void;
};

export function ChatMessageItem({
  avatarSeed,
  compactSpacing,
  dateBadgeLabel,
  isFirst,
  message,
  messages,
  messageIndex,
  onCancelInviteRequest,
  onRoommateRequestAccept,
}: ChatMessageItemProps) {
  if (message.type === "roommate_request") {
    return (
      <ChatMessageWrapper dateBadgeLabel={dateBadgeLabel} isFirst={isFirst}>
        <RoommateRequestMessageItem
          avatarSeed={avatarSeed}
          message={message}
          onAccept={onRoommateRequestAccept}
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
        avatarSeed={avatarSeed}
        compactSpacing={compactSpacing}
        message={message}
        showMessageTime={shouldShowMessageTime(messages, messageIndex)}
      />
    </ChatMessageWrapper>
  );
}

function RoommateRequestMessageItem({
  avatarSeed,
  message,
  onAccept,
}: {
  avatarSeed: number;
  message: Extract<ChatMessage, { type: "roommate_request" }>;
  onAccept?: () => void;
}) {
  return (
    <div className="flex w-full items-end gap-200">
      <ProfileAvatar className="shrink-0 self-end" seed={avatarSeed} size={36} />
      <ChatRoommateRequestMessage onAccept={onAccept} requesterName={message.requesterName} />
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
  avatarSeed,
  compactSpacing,
  message,
  showMessageTime,
}: {
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
          seed={avatarSeed}
          size={36}
        />
      ) : null}

      {!isOutgoing ? (
        <div className="max-w-55 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-bg-secondary px-300 py-300">
          <p className="whitespace-pre-wrap break-words typo-caption2 text-text-alternative">
            {message.text}
          </p>
        </div>
      ) : null}

      {showMessageTime ? (
        <span className="typo-caption4 text-text-disabled">{message.sentAt}</span>
      ) : null}

      {isOutgoing ? (
        <div className="max-w-55 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-brand-primary px-300 py-300">
          <p className="whitespace-pre-wrap break-words typo-caption2 text-text-on-primary">
            {message.text}
          </p>
        </div>
      ) : null}
    </div>
  );
}

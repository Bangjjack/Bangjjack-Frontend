import { ProfileAvatar } from "@/components/ui";
import { ChatRoommateAcceptMessage } from "@/features/chat/components/chat-detail/ChatRoommateAcceptMessage";
import type { ChatDetail, ChatMessage } from "@/features/chat/types";
import { cn } from "@/lib/cn";

type ChatRoommateAcceptMessageItemProps = {
  avatarImageUrl?: string | null;
  avatarSeed: number;
  chatDetail: ChatDetail;
  message: Extract<ChatMessage, { type: "roommate_accept" }>;
};

export function ChatRoommateAcceptMessageItem({
  avatarImageUrl,
  avatarSeed,
  chatDetail,
  message,
}: ChatRoommateAcceptMessageItemProps) {
  const isSent = message.variant === "sent";

  return (
    <div className={cn("flex w-full items-end gap-200", isSent && "justify-end")}>
      {!isSent ? (
        <ProfileAvatar
          className="shrink-0 self-end"
          imageUrl={avatarImageUrl}
          seed={avatarSeed}
          size={36}
        />
      ) : null}

      {isSent && message.sentAt ? (
        <span className="shrink-0 whitespace-nowrap typo-caption4 text-text-disabled">
          {message.sentAt}
        </span>
      ) : null}

      <ChatRoommateAcceptMessage
        chatDetail={chatDetail}
        partnerName={message.partnerName}
        variant={message.variant}
      />

      {!isSent && message.sentAt ? (
        <span className="shrink-0 whitespace-nowrap typo-caption4 text-text-disabled">
          {message.sentAt}
        </span>
      ) : null}
    </div>
  );
}

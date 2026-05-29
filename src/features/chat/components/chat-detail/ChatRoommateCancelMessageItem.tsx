import { ProfileAvatar } from "@/components/ui";
import { ChatRoommateRequestMessage } from "@/features/chat/components/chat-detail/ChatRoommateRequestMessage";
import type { ChatMessage } from "@/features/chat/types";
import { cn } from "@/lib/cn";

type ChatRoommateCancelMessageItemProps = {
  avatarImageUrl?: string | null;
  avatarSeed: number;
  message: Extract<ChatMessage, { type: "roommate_cancel" }>;
  onResend?: () => void;
};

export function ChatRoommateCancelMessageItem({
  avatarImageUrl,
  avatarSeed,
  message,
  onResend,
}: ChatRoommateCancelMessageItemProps) {
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

      <ChatRoommateRequestMessage
        type="cancel"
        variant={message.variant}
        partnerName={message.partnerName}
        onResend={onResend}
      />

      {!isSent && message.sentAt ? (
        <span className="shrink-0 whitespace-nowrap typo-caption4 text-text-disabled">
          {message.sentAt}
        </span>
      ) : null}
    </div>
  );
}

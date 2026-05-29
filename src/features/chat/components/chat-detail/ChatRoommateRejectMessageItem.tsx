import { ProfileAvatar } from "@/components/ui";
import { ChatRoommateRejectMessage } from "@/features/chat/components/chat-detail/ChatRoommateRejectMessage";
import type { ChatMessage } from "@/features/chat/types";
import { cn } from "@/lib/cn";

type ChatRoommateRejectMessageItemProps = {
  avatarImageUrl?: string | null;
  avatarSeed: number;
  message: Extract<ChatMessage, { type: "roommate_reject" }>;
};

export function ChatRoommateRejectMessageItem({
  avatarImageUrl,
  avatarSeed,
  message,
}: ChatRoommateRejectMessageItemProps) {
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

      <ChatRoommateRejectMessage partnerName={message.partnerName} variant={message.variant} />

      {!isSent && message.sentAt ? (
        <span className="shrink-0 whitespace-nowrap typo-caption4 text-text-disabled">
          {message.sentAt}
        </span>
      ) : null}
    </div>
  );
}

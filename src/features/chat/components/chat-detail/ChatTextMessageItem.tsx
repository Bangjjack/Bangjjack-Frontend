import { ProfileAvatar } from "@/components/ui";
import type { ChatTextMessage } from "@/features/chat/types";
import { cn } from "@/lib/cn";

type ChatTextMessageItemProps = {
  avatarImageUrl?: string | null;
  avatarSeed: number;
  compactSpacing: boolean;
  message: ChatTextMessage;
  partnerLastReadMessageId?: number | null;
  showMessageTime: boolean;
};

export function ChatTextMessageItem({
  avatarImageUrl,
  avatarSeed,
  compactSpacing,
  message,
  partnerLastReadMessageId,
  showMessageTime,
}: ChatTextMessageItemProps) {
  const isOutgoing = message.type === "outgoing";
  const showProfile = !isOutgoing && !compactSpacing;
  const isReadByPartner = isOutgoing && message.id <= (partnerLastReadMessageId ?? 0);

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

      {showMessageTime || isReadByPartner ? (
        <div className="flex shrink-0 flex-col items-end">
          {isReadByPartner ? (
            <span className="whitespace-nowrap typo-caption4 text-brand-primary">읽음</span>
          ) : null}
          {showMessageTime ? (
            <span className="whitespace-nowrap typo-caption4 text-text-disabled">
              {message.sentAt}
            </span>
          ) : null}
        </div>
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

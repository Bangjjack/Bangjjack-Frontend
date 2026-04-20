import { ProfileAvatar } from "@/components/ui/profile-avatar";
import { formatUnreadCount } from "@/features/chat/utils";

export type ChatListItemProps = {
  message: string;
  nickname: string;
  timeLabel: string;
  unreadCount: number;
};

function ChatListItem({ message, nickname, timeLabel, unreadCount }: ChatListItemProps) {
  return (
    <li className="flex items-center border-b border-border-normal px-300 py-500 cursor-pointer">
      <div className="flex min-w-0 flex-1 items-center justify-between gap-400">
        <div className="flex min-w-0 items-center gap-400">
          <ProfileAvatar seed={1} size={48} />

          <div className="min-w-0">
            <p className="truncate typo-title3 text-text-normal">{nickname}</p>
            <p className="mt-100 truncate typo-caption1 tracking-[-0.03125rem] text-text-placeholder">
              {message}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-center gap-200 self-stretch">
          <span className="typo-caption2 tracking-[-0.03125rem] text-text-disabled">
            {timeLabel}
          </span>
          <span className="inline-flex h-5.5 min-w-5.5 items-center justify-center rounded-full bg-brand-primary px-1.5 typo-label2 text-text-on-primary">
            {formatUnreadCount(unreadCount)}
          </span>
        </div>
      </div>
    </li>
  );
}

export { ChatListItem };

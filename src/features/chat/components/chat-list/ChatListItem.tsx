import { Avatar, AvatarFallback, AvatarImage, ProfileAvatar } from "@/components/ui";

import { MessageCount } from "./MessageCount";

export interface ChatListItemProps {
  id: number;
  message: string;
  nickname: string;
  onClick?: () => void;
  profileImageUrl?: string | null;
  timeLabel: string;
  unreadCount: number;
}

function ChatListItem({
  id,
  message,
  nickname,
  onClick,
  profileImageUrl,
  timeLabel,
  unreadCount,
}: ChatListItemProps) {
  return (
    <li>
      <button
        className="flex w-full items-center border-b border-border-normal px-300 py-500 text-left cursor-pointer"
        onClick={onClick}
        type="button"
      >
        <div className="flex min-w-0 flex-1 items-center justify-between gap-400">
          <div className="flex min-w-0 items-center gap-400">
            {profileImageUrl ? (
              <Avatar className="size-12">
                <AvatarImage alt={`${nickname} profile`} src={profileImageUrl} />
                <AvatarFallback className="bg-transparent">
                  <ProfileAvatar seed={id} size={48} />
                </AvatarFallback>
              </Avatar>
            ) : (
              <ProfileAvatar seed={id} size={48} />
            )}

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
            <MessageCount count={unreadCount} />
          </div>
        </div>
      </button>
    </li>
  );
}

export { ChatListItem };

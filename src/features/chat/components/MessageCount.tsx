import { formatUnreadCount } from "@/features/chat/utils";

export interface MessageCountProps {
  count: number;
}

function MessageCount({ count }: MessageCountProps) {
  const formattedCount = formatUnreadCount(count);

  if (!formattedCount) {
    return null;
  }

  return (
    <span className="inline-flex h-5.5 min-w-5.5 items-center justify-center rounded-full bg-brand-primary px-1.5 typo-label2 text-text-on-primary">
      {formattedCount}
    </span>
  );
}

export { MessageCount };

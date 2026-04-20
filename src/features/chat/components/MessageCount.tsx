import { formatUnreadCount } from "@/features/chat/utils";

export type MessageCountProps = {
  count: number;
};

function MessageCount({ count }: MessageCountProps) {
  return (
    <span className="inline-flex h-5.5 min-w-5.5 items-center justify-center rounded-full bg-brand-primary px-1.5 typo-label2 text-text-on-primary">
      {formatUnreadCount(count)}
    </span>
  );
}

export { MessageCount };

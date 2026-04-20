import { CHAT_INPUT_MENU_ITEMS } from "@/features/chat/constants";
import type { ChatInputMenuAction } from "@/features/chat/types";
import { cn } from "@/lib/cn";

export type ChatInputMenuProps = {
  className?: string;
  isClosing?: boolean;
  onActionClick?: (action: ChatInputMenuAction) => void;
  onAnimationEnd?: React.AnimationEventHandler<HTMLDivElement>;
};

function ChatInputMenu({
  className,
  isClosing = false,
  onActionClick,
  onAnimationEnd,
}: ChatInputMenuProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border-strong bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
        isClosing ? "animate-input-menu-down" : "animate-input-menu-up",
        className,
      )}
      onAnimationEnd={onAnimationEnd}
    >
      {CHAT_INPUT_MENU_ITEMS.map((item, index) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            className={cn(
              "flex w-full cursor-pointer items-center gap-300 px-400 py-400 text-left",
              index === 0 && "border-b border-border-strong",
            )}
            onClick={() => onActionClick?.(item.id)}
            type="button"
          >
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl",
                item.iconBackgroundClassName,
              )}
            >
              <Icon className={cn("size-6 [&_path]:stroke-current", item.iconClassName)} />
            </div>

            <div className="flex min-w-0 flex-col gap-1">
              <p className="typo-title3 text-text-primary">{item.title}</p>
              <p className="typo-caption2 text-text-caption">{item.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export { ChatInputMenu };

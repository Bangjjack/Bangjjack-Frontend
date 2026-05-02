import { useLayoutEffect, useRef } from "react";

import { CirclePlusIcon, CircleXIcon, SendIcon } from "@/assets/icons";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";

export type ChatInputBarProps = {
  ariaLabel?: string;
  isMenuOpen?: boolean;
  onChange: (value: string) => void;
  onPlusClick?: () => void;
  onSubmit: () => void;
  placeholder?: string;
  value: string;
};

function ChatInputBar({
  ariaLabel,
  isMenuOpen = false,
  onChange,
  onPlusClick,
  onSubmit,
  placeholder = "메시지를 입력하세요",
  value,
}: ChatInputBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSubmit = value.trim().length > 0;
  const PlusButtonIcon = isMenuOpen ? CircleXIcon : CirclePlusIcon;

  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <div className="border-t border-border-strong bg-bg-secondary px-400 py-300">
      <div className="flex items-center justify-center gap-2.5">
        <button
          aria-label={isMenuOpen ? "추가 메뉴 닫기" : "추가 메뉴 열기"}
          className={cn(
            "flex size-600 shrink-0 cursor-pointer items-center justify-center",
            isMenuOpen ? "text-brand-primary" : "text-icon-strong",
          )}
          onClick={onPlusClick}
          type="button"
        >
          <PlusButtonIcon
            key={isMenuOpen ? "close" : "open"}
            className="animate-input-toggle-icon size-600 [&_path]:stroke-current"
          />
        </button>

        <div className="flex min-w-px flex-[1_0_0] items-center overflow-hidden rounded-2xl bg-bg-input px-2.5 py-2">
          <Textarea
            aria-label={ariaLabel ?? placeholder}
            className="max-h-30 min-h-5 w-full resize-none overflow-y-auto bg-transparent p-0 typo-button2 font-medium tracking-[-0.07px] text-text-strong"
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              const isComposing = event.nativeEvent.isComposing || event.keyCode === 229;

              if (!isComposing && canSubmit && event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSubmit();
              }
            }}
            placeholder={placeholder}
            ref={textareaRef}
            rows={1}
            unstyled
            value={value}
          />
        </div>

        <button
          aria-label="메시지 전송"
          className={cn(
            "flex size-600 shrink-0 items-center justify-center",
            canSubmit ? "cursor-pointer text-brand-primary" : "text-text-disabled",
          )}
          disabled={!canSubmit}
          onClick={onSubmit}
          type="button"
        >
          <SendIcon className="size-600 [&_path]:stroke-current" />
        </button>
      </div>
    </div>
  );
}

export { ChatInputBar };

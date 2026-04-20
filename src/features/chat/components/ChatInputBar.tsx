import { CirclePlusIcon, SendIcon } from "@/assets/icons";

export type ChatInputBarProps = {
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  value: string;
};

function ChatInputBar({
  onChange,
  onSubmit,
  placeholder = "메세지를 입력하세요",
  value,
}: ChatInputBarProps) {
  return (
    <div className="border-t border-border-strong bg-bg-secondary px-400 py-300">
      <div className="flex items-center justify-center gap-2.5">
        <button
          aria-label="첨부 추가"
          className="flex size-600 shrink-0 cursor-pointer items-center justify-center text-icon-strong"
          type="button"
        >
          <CirclePlusIcon className="size-600 [&_path]:stroke-current" />
        </button>

        <div className="flex min-w-px flex-[1_0_0] items-center overflow-hidden rounded-full bg-bg-input p-2.5">
          <input
            className="w-full bg-transparent typo-button2 font-medium tracking-[-0.07px] text-text-strong outline-none placeholder:text-text-placeholder"
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onSubmit();
              }
            }}
            placeholder={placeholder}
            value={value}
          />
        </div>

        <button
          aria-label="메시지 전송"
          className="flex size-600 shrink-0 cursor-pointer items-center justify-center text-brand-primary"
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

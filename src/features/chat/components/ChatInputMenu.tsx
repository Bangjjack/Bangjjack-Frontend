import { ImageIcon, UsersIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";

type ChatInputMenuItem = {
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBackgroundClassName: string;
  iconClassName: string;
  id: "invite" | "photo";
  title: string;
};

const CHAT_INPUT_MENU_ITEMS: ChatInputMenuItem[] = [
  {
    description: "공식 룸메이트 요청을 보내세요",
    icon: UsersIcon,
    iconBackgroundClassName: "bg-brand-primary-light",
    iconClassName: "text-brand-primary",
    id: "invite",
    title: "룸메이트 초대 요청",
  },
  {
    description: "갤러리에서 사진을 선택하세요",
    icon: ImageIcon,
    iconBackgroundClassName: "bg-brand-secondary-light",
    iconClassName: "text-brand-secondary",
    id: "photo",
    title: "사진 보내기",
  },
];

export type ChatInputMenuAction = ChatInputMenuItem["id"];

export type ChatInputMenuProps = {
  className?: string;
  onActionClick?: (action: ChatInputMenuAction) => void;
};

function ChatInputMenu({ className, onActionClick }: ChatInputMenuProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border-strong bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
        className,
      )}
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

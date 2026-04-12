import { MessageCircle, House, Puzzle, UserRound } from "lucide-react";

import { cn } from "@/lib/cn";

type BottomNavIcon = "chat" | "home" | "mypage" | "room";

type BottomNavItem = {
  hasBadge?: boolean;
  href?: string;
  icon: BottomNavIcon;
  isActive?: boolean;
  label: string;
};

type BottomNavButtonProps = BottomNavItem & {
  onClick?: () => void;
};

type BottomNavProps = React.ComponentProps<"nav"> & {
  items?: BottomNavItem[];
};

const defaultItems: BottomNavItem[] = [
  { icon: "home", isActive: true, label: "홈" },
  { icon: "room", label: "방 찾기" },
  { hasBadge: true, icon: "chat", label: "채팅" },
  { icon: "mypage", label: "MY" },
];

function BottomNav({
  className,
  items = defaultItems,
  ...props
}: BottomNavProps) {
  return (
    <nav
      aria-label="\uD558\uB2E8 \uB0B4\uBE44\uAC8C\uC774\uC158"
      className={cn(
        "flex w-full items-center justify-between overflow-hidden rounded-[30px] bg-text-strong px-400 py-2.5",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <BottomNavButton key={item.label} {...item} />
      ))}
    </nav>
  );
}

function BottomNavButton({
  // hasBadge = false,
  href,
  icon,
  isActive = false,
  label,
  onClick,
}: BottomNavButtonProps) {
  const content = (
    <>
      <span className=" relative flex items-center justify-center">
        <BottomNavIcon
          icon={icon}
          isActive={isActive}
          className={cn(icon === "home" ? "size-5.75" : "size-600")}
        />
        {/* 추후에 새 채팅 목록 있을 때 보여줄 뱃지, 현재는 주석처리 해둠
        {hasBadge ? (
          <span className="absolute right-0 top-0 size-100 rounded-full bg-brand-primary" />
        ) : null} */}
      </span>
      <span
        className={cn(
          "typo-title4 whitespace-nowrap",
          isActive ? "text-brand-primary" : "text-text-caption",
        )}
      >
        {label}
      </span>
    </>
  );

  const boxClassName = cn(
    "flex h-[61px] w-14 shrink-0 flex-col items-center justify-center gap-200 rounded-medium px-300 py-200 cursor-pointer",
    isActive ? "text-brand-primary" : "text-text-caption",
  );

  if (href) {
    return (
      <div className="flex items-center justify-center">
        <a className={boxClassName} href={href} onClick={onClick}>
          {content}
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <button className={boxClassName} onClick={onClick} type="button">
        {content}
      </button>
    </div>
  );
}

type BottomNavIconProps = {
  className?: string;
  icon: BottomNavIcon;
  isActive?: boolean;
};

function BottomNavIcon({
  className,
  icon,
  isActive = false,
}: BottomNavIconProps) {
  const iconClassName = cn(
    "shrink-0",
    isActive ? "text-brand-primary" : "text-icon-alternative",
    className,
  );

  switch (icon) {
    case "home":
      return <House className={iconClassName} strokeWidth={2.25} />;
    case "room":
      return <Puzzle className={iconClassName} strokeWidth={2.25} />;
    case "chat":
      return <MessageCircle className={iconClassName} strokeWidth={2.25} />;
    case "mypage":
      return <UserRound className={iconClassName} strokeWidth={2.25} />;
    default:
      return null;
  }
}

export { BottomNav };
export type { BottomNavItem, BottomNavProps };

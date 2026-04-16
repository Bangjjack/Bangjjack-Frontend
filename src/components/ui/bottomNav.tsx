import ChatIcon from "@/assets/icons/chat.svg?react";
import HomeIcon from "@/assets/icons/home.svg?react";
import RoomIcon from "@/assets/icons/puzzle.svg?react";
import UserIcon from "@/assets/icons/user.svg?react";
import { cn } from "@/lib/cn";
import type { BottomNavIcon } from "@/types/bottomNav";
import { Link } from "react-router";

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
  activeIcon?: BottomNavIcon;
  items?: BottomNavItem[];
  onActiveIconChange?: (icon: BottomNavIcon) => void;
};

type BottomNavIconProps = {
  className?: string;
  icon: BottomNavIcon;
  isActive?: boolean;
};

type BottomNavActionProps = {
  children: React.ReactNode;
  className: string;
  href?: string;
  onClick?: () => void;
};

const DEFAULT_ITEMS: BottomNavItem[] = [
  { icon: "home", isActive: true, label: "홈" },
  { icon: "room", label: "방 찾기" },
  { hasBadge: true, icon: "chat", label: "채팅" },
  { icon: "mypage", label: "MY" },
];

function BottomNav({
  activeIcon,
  className,
  items = DEFAULT_ITEMS,
  onActiveIconChange,
  ...props
}: BottomNavProps) {
  const resolvedActiveIcon =
    activeIcon ?? items.find((item) => item.isActive)?.icon ?? items[0]?.icon ?? "home";

  return (
    <nav
      aria-label="하단 내비게이션"
      className={cn(
        "flex w-full items-center justify-between overflow-hidden rounded-[30px] bg-text-strong px-400 py-2.5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)]",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <BottomNavButton
          key={item.icon}
          {...item}
          isActive={item.icon === resolvedActiveIcon}
          onClick={() => onActiveIconChange?.(item.icon)}
        />
      ))}
    </nav>
  );
}

function BottomNavButton({ href, icon, isActive = false, label, onClick }: BottomNavButtonProps) {
  const content = (
    <>
      <span className="relative flex items-center justify-center">
        <BottomNavIcon
          icon={icon}
          isActive={isActive}
          className={cn(icon === "home" ? "size-5.75" : "size-600")}
        />
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
    "flex h-[61px] w-14 shrink-0 cursor-pointer flex-col items-center justify-center gap-200 rounded-medium px-300 py-200",
    isActive ? "text-brand-primary" : "text-text-caption",
  );

  return (
    <div className="flex items-center justify-center">
      <BottomNavAction className={boxClassName} href={href} onClick={onClick}>
        {content}
      </BottomNavAction>
    </div>
  );
}

function BottomNavAction({ children, className, href, onClick }: BottomNavActionProps) {
  if (href) {
    return (
      <Link className={className} onClick={onClick} to={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
}

function BottomNavIcon({ className, icon, isActive = false }: BottomNavIconProps) {
  const colorClassName = isActive ? "text-brand-primary" : "text-icon-alternative";

  switch (icon) {
    case "home":
      return (
        <HomeIcon
          aria-hidden="true"
          className={cn(className, colorClassName, "[&_path]:fill-current")}
        />
      );
    case "room":
      return (
        <RoomIcon
          aria-hidden="true"
          className={cn(className, colorClassName, "[&_path]:fill-current")}
        />
      );
    case "chat":
      return (
        <ChatIcon
          aria-hidden="true"
          className={cn(className, colorClassName, "[&_path]:stroke-current")}
        />
      );
    case "mypage":
      return (
        <UserIcon
          aria-hidden="true"
          className={cn(className, colorClassName, "[&_path]:stroke-current")}
        />
      );
    default:
      return null;
  }
}

export { BottomNav };
export type { BottomNavIcon, BottomNavItem, BottomNavProps };

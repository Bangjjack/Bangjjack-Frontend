import { cn } from "@/lib/cn";

import type { BottomNavIcon } from "./bottomNav";

type HeaderProps = React.ComponentProps<"div"> & {
  activeIcon: BottomNavIcon;
  userName: string;
};

const HEADER_TITLES: Partial<Record<BottomNavIcon, string>> = {
  chat: "채팅",
  mypage: "마이페이지",
  room: "방 찾기",
};

function Header({
  activeIcon,
  className,
  userName,
  ...props
}: HeaderProps) {
  const title = HEADER_TITLES[activeIcon];

  return (
    <div className={cn(className)} {...props}>
      {activeIcon === "home" ? (
        <header className="px-400 pb-400 pt-9">
          <h1 className="typo-h3 text-text-strong">
            <span className="text-text-primary-alternative">{userName}</span>
            <span>{"님 안녕하세요!"}</span>
          </h1>
        </header>
      ) : title ? (
        <header className="px-400 pb-400 pt-9">
          <div className="flex items-center justify-center">
            <h1 className="typo-title1 font-semibold text-center text-text-strong">
              {title}
            </h1>
          </div>
        </header>
      ) : null}
    </div>
  );
}

export { Header };
export type { HeaderProps };

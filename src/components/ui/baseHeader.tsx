import { cn } from "@/lib/cn";

import type { BottomNavIcon } from "./bottomNav";
import { ChatHeader } from "./header/chatHeader";
import { HomeHeader } from "./header/homeHeader";
import { MyPageHeader } from "./header/myPageHeader";
import { RoomHeader } from "./header/roomHeader";

type BaseHeaderProps = React.ComponentProps<"div"> & {
  activeIcon: BottomNavIcon;
  userName: string;
};

function BaseHeader({
  activeIcon,
  className,
  userName,
  ...props
}: BaseHeaderProps) {
  return (
    <div className={cn(className)} {...props}>
      {activeIcon === "home" ? <HomeHeader userName={userName} /> : null}
      {activeIcon === "room" ? <RoomHeader /> : null}
      {activeIcon === "chat" ? <ChatHeader /> : null}
      {activeIcon === "mypage" ? <MyPageHeader /> : null}
    </div>
  );
}

export { BaseHeader };
export type { BaseHeaderProps };

import { useState } from "react";

import { BottomNav, Header } from "@/components/ui";
import ChatPage from "@/pages/ChatPage";
import HomePage from "@/pages/HomePage";
import MyPage from "@/pages/MyPage";
import RoomPage from "@/pages/RoomPage";
import type { BottomNavIcon } from "@/types/bottomNav";
import type { HeaderProps } from "@/components/ui";

const PAGE_COMPONENTS: Record<BottomNavIcon, React.ReactNode> = {
  chat: <ChatPage />,
  home: <HomePage />,
  mypage: <MyPage />,
  room: <RoomPage />,
};

const HEADER_CONFIG: Record<
  BottomNavIcon,
  Pick<HeaderProps, "showBack" | "showMore" | "showProfile" | "title" | "variant">
> = {
  chat: { showBack: true, title: "채팅", variant: "title" },
  home: { variant: "home" },
  mypage: { showBack: true, title: "마이페이지", variant: "title" },
  room: { title: "방 찾기", variant: "title" },
};

export default function MainPage() {
  const [activeIcon, setActiveIcon] = useState<BottomNavIcon>("home");
  const [, setNavigationHistory] = useState<BottomNavIcon[]>([]);
  const headerConfig = HEADER_CONFIG[activeIcon];

  const handleActiveIconChange = (nextIcon: BottomNavIcon) => {
    if (nextIcon === activeIcon) {
      return;
    }

    setNavigationHistory((prev) => [...prev, activeIcon]);
    setActiveIcon(nextIcon);
  };

  const handleBackClick = () => {
    setNavigationHistory((prev) => {
      const previousIcon = prev.at(-1);

      if (!previousIcon) {
        return prev;
      }

      setActiveIcon(previousIcon);
      return prev.slice(0, -1);
    });
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header {...headerConfig} onBackClick={handleBackClick} userName="방짝" />
      <main
        className="layout-figma-frame min-h-0 flex-1 overflow-hidden px-400"
        style={{ "--width-figma-frame": "430px" } as React.CSSProperties}
      >
        <div className="scrollbar-none h-full overflow-y-auto">{PAGE_COMPONENTS[activeIcon]}</div>
      </main>
      <div className="p-400">
        <BottomNav activeIcon={activeIcon} onActiveIconChange={handleActiveIconChange} />
      </div>
    </div>
  );
}

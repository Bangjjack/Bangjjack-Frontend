import { useState } from "react";

import { BottomNav, Header } from "@/components/ui";
import ChatPage from "@/pages/ChatPage";
import HomePage from "@/pages/HomePage";
import MyPage from "@/pages/MyPage";
import RoomPage from "@/pages/RoomPage";
import type { BottomNavIcon } from "@/types/bottomNav";
import type { HeaderVariant } from "@/types/header";

const PAGE_COMPONENTS: Record<BottomNavIcon, React.ReactNode> = {
  chat: <ChatPage />,
  home: <HomePage />,
  mypage: <MyPage />,
  room: <RoomPage />,
};

const HEADER_CONFIG: Record<BottomNavIcon, { title?: string; variant: HeaderVariant }> = {
  home: { variant: "home" },
  room: { title: "방 찾기", variant: "title" },
  chat: { title: "채팅", variant: "backTitle" },
  mypage: { title: "마이페이지", variant: "backTitle" },
};

export default function MainPage() {
  const [activeIcon, setActiveIcon] = useState<BottomNavIcon>("home");
  const [navigationHistory, setNavigationHistory] = useState<BottomNavIcon[]>([]);
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
      <Header
        {...headerConfig}
        onBackClick={handleBackClick}
        userName="방짝"
      />
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

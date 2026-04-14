import { useState } from "react";

import { Header, BottomNav } from "@/components/ui";
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

const HEADER_CONFIG: Record<
  BottomNavIcon,
  { title?: string; variant: HeaderVariant }
> = {
  chat: { title: "채팅", variant: "chat" },
  home: { variant: "home" },
  mypage: { title: "마이페이지", variant: "title" },
  room: { title: "방 찾기", variant: "title" },
};

export default function MainPage() {
  const [activeIcon, setActiveIcon] = useState<BottomNavIcon>("home");
  const headerConfig = HEADER_CONFIG[activeIcon];

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header {...headerConfig} userName="방짝" />
      <main className="min-h-0 flex-1 overflow-hidden px-400">
        <div className="scrollbar-none h-full overflow-y-auto">{PAGE_COMPONENTS[activeIcon]}</div>
      </main>
      <div className="p-400">
        <BottomNav activeIcon={activeIcon} onActiveIconChange={setActiveIcon} />
      </div>
    </div>
  );
}

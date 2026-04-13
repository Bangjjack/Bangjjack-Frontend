import { useState } from "react";

import { Header, BottomNav, type BottomNavIcon } from "@/components/ui";
import ChatPage from "@/pages/ChatPage";
import HomePage from "@/pages/HomePage";
import MyPage from "@/pages/MyPage";
import RoomPage from "@/pages/RoomPage";

const PAGE_COMPONENTS: Record<BottomNavIcon, React.ReactNode> = {
  chat: <ChatPage />,
  home: <HomePage />,
  mypage: <MyPage />,
  room: <RoomPage />,
};

export default function MainPage() {
  const [activeIcon, setActiveIcon] = useState<BottomNavIcon>("home");

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header activeIcon={activeIcon} userName="방짝" />
      <main className="min-h-0 flex-1 overflow-hidden px-400">
        <div className="scrollbar-none h-full overflow-y-auto">{PAGE_COMPONENTS[activeIcon]}</div>
      </main>
      <div className="p-400">
        <BottomNav activeIcon={activeIcon} onActiveIconChange={setActiveIcon} />
      </div>
    </div>
  );
}

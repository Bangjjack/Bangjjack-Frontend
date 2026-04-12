import { useState } from "react";

import { Header, BottomNav, type BottomNavIcon } from "@/components/ui";

export default function MainPage() {
  const [activeIcon, setActiveIcon] = useState<BottomNavIcon>("home");

  return (
    <div className="flex min-h-dvh flex-col justify-between bg-bg-primary">
      <Header activeIcon={activeIcon} userName={"방짝"} />
      <div className="p-400">
        <BottomNav activeIcon={activeIcon} onActiveIconChange={setActiveIcon} />
      </div>
    </div>
  );
}

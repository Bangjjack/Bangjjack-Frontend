import { useState } from "react";

import { Surface } from "@/components/ui";
import { ActivityTabs } from "@/features/mypage/components/activity/ActivityTabs";
import { MyActivityMatchList } from "@/features/mypage/components/activity/MyActivityMatchList";
import { MyActivityRoomList } from "@/features/mypage/components/activity/MyActivityRoomList";
import { MyRecruitPostList } from "@/features/mypage/components/activity/MyRecruitPostList";
import { MY_ACTIVITY_ACTIVE_TAB_ID } from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

import type { MyActivityTabId } from "@/features/mypage/types";

export interface MyActivityContentProps {
  className?: string;
}

function MyActivityContent({ className }: MyActivityContentProps) {
  const [activeTabId, setActiveTabId] = useState<MyActivityTabId>(MY_ACTIVITY_ACTIVE_TAB_ID);

  return (
    <Surface
      as="section"
      variant="default"
      className={cn("flex flex-col gap-400 overflow-hidden", className)}
    >
      <ActivityTabs activeTabId={activeTabId} onTabChange={setActiveTabId} />

      {activeTabId === "posts" ? <MyRecruitPostList /> : null}
      {activeTabId === "rooms" ? <MyActivityRoomList /> : null}
      {activeTabId === "matches" ? <MyActivityMatchList /> : null}
    </Surface>
  );
}

export { MyActivityContent };

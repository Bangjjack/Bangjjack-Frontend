import { useState } from "react";

import { ActivityTabs } from "@/features/mypage/components/activity/ActivityTabs";
import { MyActivityMatchList } from "@/features/mypage/components/activity/MyActivityMatchList";
import { MyActivityRoomList } from "@/features/mypage/components/activity/MyActivityRoomList";
import { MyRecruitPostList } from "@/features/mypage/components/activity/MyRecruitPostList";
import { MY_ACTIVITY_ACTIVE_TAB_ID } from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

import type { MyActivityTabId } from "@/features/mypage/mocks";

export interface MyActivityContentProps {
  className?: string;
}

function MyActivityContent({ className }: MyActivityContentProps) {
  const [activeTabId, setActiveTabId] = useState<MyActivityTabId>(MY_ACTIVITY_ACTIVE_TAB_ID);

  return (
    <section
      className={cn(
        "flex flex-col gap-400 overflow-hidden rounded-[20px] border border-border-normal bg-bg-secondary p-400",
        className,
      )}
    >
      <ActivityTabs activeTabId={activeTabId} onTabChange={setActiveTabId} />

      {activeTabId === "posts" ? <MyRecruitPostList /> : null}
      {activeTabId === "rooms" ? <MyActivityRoomList /> : null}
      {activeTabId === "matches" ? <MyActivityMatchList /> : null}
    </section>
  );
}

export { MyActivityContent };

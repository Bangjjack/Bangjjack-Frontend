import { useState } from "react";

import { Surface } from "@/components/ui";
import { ActivityTabs } from "@/features/mypage/components/activity/ActivityTabs";
import { MyActivityRoomList } from "@/features/mypage/components/activity/MyActivityRoomList";
import { MyRecruitPostList } from "@/features/mypage/components/activity/MyRecruitPostList";
import { MY_ACTIVITY_ACTIVE_TAB_ID, MY_ACTIVITY_TABS } from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

import type { MyActivityTabId } from "@/features/mypage/types";

export interface MyActivityContentProps {
  className?: string;
}

function MyActivityContent({ className }: MyActivityContentProps) {
  const [activeTabId, setActiveTabId] = useState<MyActivityTabId>(MY_ACTIVITY_ACTIVE_TAB_ID);
  const activeIndex = MY_ACTIVITY_TABS.findIndex((tab) => tab.id === activeTabId);

  return (
    <Surface
      as="section"
      variant="default"
      className={cn("flex h-full flex-col overflow-hidden", className)}
    >
      <ActivityTabs activeTabId={activeTabId} onTabChange={setActiveTabId} />

      <div className="flex-1 overflow-x-hidden">
        <div
          className="flex h-full transition-transform duration-200"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          <div className="scrollbar-none w-full shrink-0 overflow-y-auto pt-400">
            <MyRecruitPostList />
          </div>
          <div className="scrollbar-none w-full shrink-0 overflow-y-auto pt-400">
            <MyActivityRoomList />
          </div>
        </div>
      </div>
    </Surface>
  );
}

export { MyActivityContent };

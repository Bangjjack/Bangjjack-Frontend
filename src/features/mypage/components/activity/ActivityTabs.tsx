import { MY_ACTIVITY_TABS } from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

import type { MyActivityTabId } from "@/features/mypage/types";

interface ActivityTabsProps {
  activeTabId: MyActivityTabId;
  onTabChange: (tabId: MyActivityTabId) => void;
}

function ActivityTabs({ activeTabId, onTabChange }: ActivityTabsProps) {
  return (
    <div className="grid grid-cols-3">
      {MY_ACTIVITY_TABS.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <button
            key={tab.id}
            className={cn(
              "typo-title3 min-w-0 cursor-pointer border-b py-2.5 text-center",
              isActive
                ? "border-b-2 border-brand-primary text-brand-primary"
                : "border-border-normal text-text-placeholder",
            )}
            onClick={() => onTabChange(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export { ActivityTabs };

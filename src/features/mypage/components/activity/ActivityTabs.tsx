import { MY_ACTIVITY_TABS } from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

import type { MyActivityTabId } from "@/features/mypage/types";

interface ActivityTabsProps {
  activeTabId: MyActivityTabId;
  onTabChange: (tabId: MyActivityTabId) => void;
}

function ActivityTabs({ activeTabId, onTabChange }: ActivityTabsProps) {
  const activeIndex = MY_ACTIVITY_TABS.findIndex((tab) => tab.id === activeTabId);
  const tabCount = MY_ACTIVITY_TABS.length;

  return (
    <div className="relative flex items-stretch border-b border-border-normal">
      {MY_ACTIVITY_TABS.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <button
            key={tab.id}
            className={cn(
              "typo-title3 min-w-0 flex-1 cursor-pointer py-2.5 text-center transition-colors duration-200",
              isActive ? "text-brand-primary" : "text-text-placeholder",
            )}
            onClick={() => onTabChange(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        );
      })}

      <div
        className="absolute bottom-0 h-0.5 bg-brand-primary transition-transform duration-200"
        style={{
          width: `${100 / tabCount}%`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
    </div>
  );
}

export { ActivityTabs };

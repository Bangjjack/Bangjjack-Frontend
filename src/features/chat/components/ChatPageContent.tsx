import { useState } from "react";
import { useNavigate } from "react-router";

import { ChatListItem } from "@/features/chat/components/ChatListItem";
import { CHAT_DETAILS, CHAT_HELPER_TEXT, CHAT_PREVIEWS, CHAT_TABS } from "@/features/chat/mocks";
import type { ChatTab } from "@/features/chat/types";
import { cn } from "@/lib/cn";

export type ChatPageContentProps = {
  className?: string;
};

function ChatPageContent({ className }: ChatPageContentProps) {
  const [activeTab, setActiveTab] = useState<ChatTab>("all");
  const navigate = useNavigate();

  const filteredChats =
    activeTab === "all"
      ? CHAT_PREVIEWS
      : CHAT_PREVIEWS.filter((chatPreview) => chatPreview.type === activeTab);

  return (
    <div className={cn("flex min-h-full flex-col pt-100", className)}>
      <section className="flex min-h-0 flex-1 flex-col rounded-medium bg-bg-secondary px-300 pb-100">
        <div className="flex">
          {CHAT_TABS.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                aria-pressed={isActive}
                className={cn(
                  "flex flex-1 cursor-pointer items-center justify-center border-b px-300 py-300 transition-colors",
                  isActive
                    ? "border-brand-primary text-text-primary-alternative"
                    : "border-border-normal text-text-disabled",
                )}
                onClick={() => setActiveTab(tab.key)}
                type="button"
              >
                <span className="typo-title3">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <ul className="flex min-h-0 flex-1 flex-col">
          {filteredChats.map((chatPreview) => {
            const linkedProfile = CHAT_DETAILS[chatPreview.id];

            return (
              <ChatListItem
                key={chatPreview.id}
                id={chatPreview.id}
                message={chatPreview.message}
                nickname={linkedProfile?.nickname ?? chatPreview.nickname}
                onClick={() => navigate(`/chat/${chatPreview.id}`)}
                timeLabel={chatPreview.timeLabel}
                unreadCount={chatPreview.unreadCount}
              />
            );
          })}
        </ul>
      </section>

      <p className="pt-300 text-center typo-caption3 text-text-disabled">{CHAT_HELPER_TEXT}</p>
    </div>
  );
}

export { ChatPageContent };

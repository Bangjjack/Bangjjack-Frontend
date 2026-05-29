import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import {
  ChatListItem,
  ChatListItemSkeleton,
  CHAT_HELPER_TEXT,
  CHAT_TAB_CATEGORY,
  CHAT_TABS,
  formatChatRoomMessage,
  formatChatRoomTime,
  getChatRoomImportanceTags,
  useChatRoomListRealtime,
  useChatRooms,
} from "@/features/chat";
import type { ChatDetail, ChatRoom, ChatRoomListItem, ChatTab } from "@/features/chat";
import { cn } from "@/lib/cn";
import { parseDisplayName } from "@/lib/parseDisplayName";

function createChatDetailFromRoom(chatRoom: ChatRoomListItem): ChatDetail {
  return {
    dateLabel: "",
    id: chatRoom.partnerId,
    matchRate: 0,
    messages: [],
    nickname: parseDisplayName(chatRoom.partnerName),
    profileSummary: getChatRoomImportanceTags(chatRoom),
    profileImage: chatRoom.partnerProfileImage,
    startSource: "ai_recommendation",
  };
}

function createChatRoomState(chatRoom: ChatRoomListItem): ChatRoom {
  return {
    createdAt: chatRoom.lastMessageAt ?? "",
    isNewRoom: false,
    participants: [{ userId: chatRoom.partnerId }],
    roomId: chatRoom.roomId,
    roomType: "DIRECT",
  };
}

function ChatTabContent({ tab }: { tab: ChatTab }) {
  const navigate = useNavigate();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isPending } = useChatRooms(
    {
      category: CHAT_TAB_CATEGORY[tab],
    },
  );
  const chatRooms = data?.rooms ?? [];

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="typo-body2 text-text-caption">채팅방 목록을 불러오지 못했어요.</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <ul className="flex flex-col">
        {Array.from({ length: 5 }, (_, i) => (
          <ChatListItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  if (chatRooms.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="typo-body2 text-text-caption">아직 채팅방이 없어요.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col">
      {chatRooms.map((chatRoom) => (
        <ChatListItem
          key={chatRoom.roomId}
          id={chatRoom.partnerId}
          message={formatChatRoomMessage(chatRoom.lastMessage)}
          nickname={parseDisplayName(chatRoom.partnerName)}
          onClick={() =>
            navigate(`/chat/${chatRoom.roomId}`, {
              state: {
                chatDetail: createChatDetailFromRoom(chatRoom),
                chatRoom: createChatRoomState(chatRoom),
              },
            })
          }
          profileImageUrl={chatRoom.partnerProfileImage}
          timeLabel={formatChatRoomTime(chatRoom.lastMessageAt)}
          unreadCount={chatRoom.unreadCount}
        />
      ))}
      <div ref={sentinelRef} />
    </ul>
  );
}

export default function ChatListPage() {
  const [activeTab, setActiveTab] = useState<ChatTab>("all");
  const activeIndex = CHAT_TABS.findIndex((t) => t.key === activeTab);
  useChatRoomListRealtime();

  return (
    <div className={cn("flex min-h-full flex-col pt-100")}>
      <section className="flex min-h-0 flex-1 flex-col rounded-medium bg-bg-secondary px-300 pb-100">
        <div className="relative flex border-b border-border-normal">
          <div
            className="absolute bottom-0 h-0.5 bg-brand-primary transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
              width: `${100 / CHAT_TABS.length}%`,
            }}
          />
          {CHAT_TABS.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                aria-pressed={isActive}
                className={cn(
                  "flex flex-1 cursor-pointer items-center justify-center px-300 py-300 transition-colors duration-300",
                  isActive ? "text-text-primary-alternative" : "text-text-disabled",
                )}
                onClick={() => setActiveTab(tab.key)}
                type="button"
              >
                <span className="typo-title3">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * (100 / CHAT_TABS.length)}%)`,
              width: `${CHAT_TABS.length * 100}%`,
            }}
          >
            {CHAT_TABS.map((tab) => (
              <div
                key={tab.key}
                className="flex h-full flex-col overflow-y-auto"
                style={{ width: `${100 / CHAT_TABS.length}%` }}
              >
                <ChatTabContent tab={tab.key} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <p className="pt-300 text-center typo-caption3 text-text-disabled">{CHAT_HELPER_TEXT}</p>
    </div>
  );
}

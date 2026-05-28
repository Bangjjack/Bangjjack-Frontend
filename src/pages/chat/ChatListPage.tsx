import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import {
  ChatListItem,
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

function createChatDetailFromRoom(chatRoom: ChatRoomListItem): ChatDetail {
  return {
    dateLabel: "",
    id: chatRoom.partnerId,
    matchRate: 0,
    messages: [],
    nickname: chatRoom.partnerName,
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

export default function ChatListPage() {
  const [activeTab, setActiveTab] = useState<ChatTab>("all");
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useChatRoomListRealtime();
  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isPending } = useChatRooms(
    {
      category: CHAT_TAB_CATEGORY[activeTab],
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

  return (
    <div className={cn("flex min-h-full flex-col pt-100")}>
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

        {isError ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="typo-body2 text-text-caption">채팅방 목록을 불러오지 못했어요.</p>
          </div>
        ) : isPending ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="typo-body2 text-text-caption">채팅방 목록을 불러오는 중이에요.</p>
          </div>
        ) : chatRooms.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="typo-body2 text-text-caption">아직 채팅방이 없어요.</p>
          </div>
        ) : (
          <ul className="flex min-h-0 flex-1 flex-col">
            {chatRooms.map((chatRoom) => (
              <ChatListItem
                key={chatRoom.roomId}
                id={chatRoom.partnerId}
                message={formatChatRoomMessage(chatRoom.lastMessage)}
                nickname={chatRoom.partnerName}
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
        )}
      </section>

      <p className="pt-300 text-center typo-caption3 text-text-disabled">{CHAT_HELPER_TEXT}</p>
    </div>
  );
}

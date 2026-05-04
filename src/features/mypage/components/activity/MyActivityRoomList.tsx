import { useState } from "react";

import { JoinedRoomCard } from "@/features/mypage/components/activity/JoinedRoomCard";
import { PendingRoomCard } from "@/features/mypage/components/activity/PendingRoomCard";
import { MyPageEmptyState } from "@/features/mypage/components/MyPageEmptyState";
import {
  MY_ACTIVITY_ACTIVE_ROOM_FILTER_ID,
  MY_ACTIVITY_ROOM_FILTERS,
  MY_ACTIVITY_ROOMS,
} from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

import type { MyActivityRoomFilterId } from "@/features/mypage/types";

const MY_JOINED_ROOM_EMPTY_MESSAGE = ["아직 소속된 방이 없어요.", "마음에 드는 방에 참여해보세요!"];
const MY_PENDING_ROOM_EMPTY_MESSAGE = [
  "아직 대기중인 방이 없어요.",
  "관심 있는 방에 신청해보세요!",
];

function MyActivityRoomList() {
  const [activeFilterId, setActiveFilterId] = useState<MyActivityRoomFilterId>(
    MY_ACTIVITY_ACTIVE_ROOM_FILTER_ID,
  );
  const filteredRooms =
    activeFilterId === "pending"
      ? MY_ACTIVITY_ROOMS.filter((room) => room.status === "pending")
      : MY_ACTIVITY_ROOMS;
  const emptyMessages =
    activeFilterId === "pending" ? MY_PENDING_ROOM_EMPTY_MESSAGE : MY_JOINED_ROOM_EMPTY_MESSAGE;
  const handleRoomActionClick = () => {
    // TODO: 방 상세보기/방 나가기 기능 추후 추가 예정
  };

  return (
    <div className="flex flex-col gap-400">
      <div className="flex flex-wrap gap-200">
        {MY_ACTIVITY_ROOM_FILTERS.map((filter) => {
          const isActive = filter.id === activeFilterId;

          return (
            <button
              key={filter.id}
              className={cn(
                "typo-button2 cursor-pointer rounded-full px-300 py-200",
                isActive
                  ? "border border-brand-primary bg-brand-primary-light text-text-primary-normal"
                  : "bg-bg-input text-text-alternative",
              )}
              onClick={() => setActiveFilterId(filter.id)}
              type="button"
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-400">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) =>
            room.status === "pending" ? (
              <PendingRoomCard key={room.id} onActionClick={handleRoomActionClick} room={room} />
            ) : (
              <JoinedRoomCard key={room.id} onActionClick={handleRoomActionClick} room={room} />
            ),
          )
        ) : (
          <MyPageEmptyState messages={emptyMessages} />
        )}
      </div>
    </div>
  );
}

export { MyActivityRoomList };

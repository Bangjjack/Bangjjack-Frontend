import { useState } from "react";

import { JoinedRoomCard } from "@/features/mypage/components/activity/JoinedRoomCard";
import { PendingRoomCard } from "@/features/mypage/components/activity/PendingRoomCard";
import {
  MY_ACTIVITY_ACTIVE_ROOM_FILTER_ID,
  MY_ACTIVITY_ROOM_FILTERS,
  MY_ACTIVITY_ROOMS,
} from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

import type { MyActivityRoomFilterId } from "@/features/mypage/mocks";

function MyActivityRoomList() {
  const [activeFilterId, setActiveFilterId] = useState<MyActivityRoomFilterId>(
    MY_ACTIVITY_ACTIVE_ROOM_FILTER_ID,
  );
  const filteredRooms =
    activeFilterId === "pending"
      ? MY_ACTIVITY_ROOMS.filter((room) => room.status === "pending")
      : MY_ACTIVITY_ROOMS;

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
        {filteredRooms.map((room) =>
          room.status === "pending" ? (
            <PendingRoomCard key={room.id} room={room} />
          ) : (
            <JoinedRoomCard key={room.id} room={room} />
          ),
        )}
      </div>
    </div>
  );
}

export { MyActivityRoomList };

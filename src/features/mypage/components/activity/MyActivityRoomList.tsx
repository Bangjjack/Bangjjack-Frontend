import { useState } from "react";

import { ProfileAvatar } from "@/components/ui";
import { ActivityButton } from "@/features/mypage/components/activity/ActivityButton";
import { ActivityTag } from "@/features/mypage/components/activity/ActivityTag";
import {
  MY_ACTIVITY_ACTIVE_ROOM_FILTER_ID,
  MY_ACTIVITY_ROOM_FILTERS,
  MY_ACTIVITY_ROOMS,
} from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

import type {
  MyActivityRoomFilterId,
  MyActivityRoomMock,
} from "@/features/mypage/mocks";

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
        {filteredRooms.map((room) => (
          <MyActivityRoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}

function MyActivityRoomCard({ room }: { room: MyActivityRoomMock }) {
  return (
    <article className="flex flex-col gap-3.5 rounded-2xl border border-border-normal p-400">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-300">
          <h2 className="typo-title3 min-w-0 flex-1 text-text-strong">{room.title}</h2>
          <span className="typo-label1 shrink-0 rounded-full bg-neutral-800 px-2.5 py-100 text-neutral-50">
            {room.statusLabel}
          </span>
        </div>

        <div className="flex gap-100">
          <ActivityTag>{room.roomType}</ActivityTag>
          <ActivityTag>{room.dormitory}</ActivityTag>
        </div>
      </div>

      {room.status === "joined" ? (
        <>
          <div className="h-px w-full bg-border-normal" aria-hidden="true" />
          <RoomMemberList members={room.members ?? []} />
        </>
      ) : (
        <div className="rounded-small bg-bg-primary p-2.5">
          <p className="typo-caption2 text-text-caption">{room.waitingMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-200">
        {room.actions.map((action) => (
          <ActivityButton key={action.id} label={action.label} tone={action.tone} />
        ))}
      </div>
    </article>
  );
}

function RoomMemberList({ members }: { members: NonNullable<MyActivityRoomMock["members"]> }) {
  return (
    <div className="flex flex-col gap-200 rounded-small bg-bg-primary px-2.5 py-3.5">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between gap-300 px-100 py-0.5">
          <div className="flex items-center gap-1.5">
            <ProfileAvatar seed={member.name.length} size={24} />
            <span className="typo-body2 text-text-strong">{member.name}</span>
          </div>
          {member.isHost ? (
            <span className="typo-label1 rounded-full bg-button-primary-ghost px-2.5 py-100 text-text-primary-alternative">
              방장
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export { MyActivityRoomList };

import { ActivityButton } from "@/features/mypage/components/activity/ActivityButton";
import { ActivityTag } from "@/features/mypage/components/activity/ActivityTag";
import { RoommateMemberList } from "@/features/mypage/components/activity/RoommateMemberList";
import { cn } from "@/lib/cn";

import type { MyActivityRoomMock } from "@/features/mypage/mocks";

type JoinedRoomCardProps = {
  className?: string;
  room: MyActivityRoomMock;
};

function JoinedRoomCard({ className, room }: JoinedRoomCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col items-center justify-center gap-3.5 rounded-2xl border border-border-normal bg-bg-secondary p-400",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-2.5">
        <div className="flex w-full flex-col items-start justify-center gap-200">
          <div className="flex w-full items-center justify-between gap-300">
            <h2 className="typo-title3 min-w-0 flex-1 truncate text-text-strong">{room.title}</h2>
            <span className="typo-label1 shrink-0 rounded-full bg-neutral-800 px-2.5 py-100 text-neutral-50">
              {room.statusLabel}
            </span>
          </div>

          <div className="flex flex-wrap gap-100">
            <ActivityTag>{room.roomType}</ActivityTag>
            <ActivityTag>{room.dormitory}</ActivityTag>
          </div>
        </div>

        <div className="h-px w-full bg-border-normal" aria-hidden="true" />

        <div className="w-full overflow-hidden">
          <RoommateMemberList members={room.members ?? []} />
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-200">
        {room.actions.map((action) => (
          <ActivityButton key={action.id} label={action.label} tone={action.tone} />
        ))}
      </div>
    </article>
  );
}

export { JoinedRoomCard };

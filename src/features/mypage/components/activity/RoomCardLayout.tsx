import { Surface, Tag } from "@/components/ui";
import { CrownIcon } from "@/assets/icons";
import { ActivityButton } from "@/features/mypage/components/activity/ActivityButton";
import { ActivityTag } from "@/features/mypage/components/activity/ActivityTag";
import { cn } from "@/lib/cn";

import type { MyActivityRoomActionMock, MyActivityRoomMock } from "@/features/mypage/types";

interface RoomCardLayoutProps {
  children?: React.ReactNode;
  className?: string;
  onActionClick?: (action: MyActivityRoomActionMock, room: MyActivityRoomMock) => void;
  room: MyActivityRoomMock;
}

function RoomCardLayout({ children, className, onActionClick, room }: RoomCardLayoutProps) {
  return (
    <Surface
      as="article"
      variant="outlined"
      className={cn("flex flex-col items-center justify-center gap-3.5", className)}
    >
      {room.variant === "leader" && (
        <div className="flex w-full items-center gap-100 overflow-hidden rounded-large bg-brand-primary-light px-2.5 py-100">
          <CrownIcon className="size-3.5 shrink-0 text-text-primary-strong" />
          <span className="typo-title4 text-text-primary-strong">나의 방</span>
        </div>
      )}
      <div className="flex w-full flex-col gap-2.5">
        <div className="flex w-full flex-col items-start justify-center gap-200">
          <div className="flex w-full items-center justify-between gap-300">
            <h2 className="typo-title3 min-w-0 flex-1 truncate text-text-strong">{room.title}</h2>
            <Tag color="black">{room.statusLabel}</Tag>
          </div>

          <div className="flex flex-wrap gap-100">
            <ActivityTag>{room.roomType}</ActivityTag>
            <ActivityTag>{room.dormitory}</ActivityTag>
          </div>
        </div>

        <div className="h-px w-full bg-border-normal" aria-hidden="true" />

        {children}
      </div>

      <div className="grid w-full grid-cols-2 gap-200">
        {room.actions.map((action) => (
          <ActivityButton
            key={action.id}
            label={action.label}
            onClick={onActionClick ? () => onActionClick(action, room) : undefined}
            tone={action.tone}
          />
        ))}
      </div>
    </Surface>
  );
}

export { RoomCardLayout };
export type { RoomCardLayoutProps };

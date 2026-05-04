import { RoomCardLayout } from "@/features/mypage/components/activity/RoomCardLayout";

import type { MyActivityRoomActionMock, MyActivityRoomMock } from "@/features/mypage/types";

interface PendingRoomCardProps {
  className?: string;
  onActionClick?: (action: MyActivityRoomActionMock, room: MyActivityRoomMock) => void;
  room: MyActivityRoomMock;
}

function PendingRoomCard({ className, onActionClick, room }: PendingRoomCardProps) {
  return (
    <RoomCardLayout className={className} onActionClick={onActionClick} room={room}>
      {room.waitingMessage && (
        <div className="w-full overflow-hidden">
          <div className="rounded-[10px] bg-bg-primary p-2.5">
            <p className="typo-caption2 truncate text-text-caption">{room.waitingMessage}</p>
          </div>
        </div>
      )}
    </RoomCardLayout>
  );
}

export { PendingRoomCard };

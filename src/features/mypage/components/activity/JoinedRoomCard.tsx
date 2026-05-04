import { RoommateMemberList } from "@/features/mypage/components/activity/RoommateMemberList";
import { RoomCardLayout } from "@/features/mypage/components/activity/RoomCardLayout";

import type { MyActivityRoomActionMock, MyActivityRoomMock } from "@/features/mypage/types";

interface JoinedRoomCardProps {
  className?: string;
  onActionClick?: (action: MyActivityRoomActionMock, room: MyActivityRoomMock) => void;
  room: MyActivityRoomMock;
}

function JoinedRoomCard({ className, onActionClick, room }: JoinedRoomCardProps) {
  return (
    <RoomCardLayout className={className} onActionClick={onActionClick} room={room}>
      <div className="w-full overflow-hidden">
        <RoommateMemberList members={room.members ?? []} />
      </div>
    </RoomCardLayout>
  );
}

export { JoinedRoomCard };

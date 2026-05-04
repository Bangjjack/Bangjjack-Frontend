import { RoommateMemberList } from "@/features/mypage/components/activity/RoommateMemberList";
import { RoomCardLayout } from "@/features/mypage/components/activity/RoomCardLayout";

import type { MyActivityRoomMock } from "@/features/mypage/types";

interface JoinedRoomCardProps {
  className?: string;
  room: MyActivityRoomMock;
}

function JoinedRoomCard({ className, room }: JoinedRoomCardProps) {
  return (
    <RoomCardLayout className={className} room={room}>
      <div className="w-full overflow-hidden">
        <RoommateMemberList members={room.members ?? []} />
      </div>
    </RoomCardLayout>
  );
}

export { JoinedRoomCard };

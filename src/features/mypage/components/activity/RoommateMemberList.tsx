import { ProfileAvatar } from "@/components/ui";
import { cn } from "@/lib/cn";

import type { MyActivityRoomMemberMock } from "@/features/mypage/mocks";

type RoommateMemberListProps = {
  className?: string;
  members: MyActivityRoomMemberMock[];
};

function RoommateMemberList({ className, members }: RoommateMemberListProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-200 rounded-[10px] bg-bg-primary px-2.5 py-3.5",
        className,
      )}
    >
      {members.map((member) => (
        <div
          key={member.id}
          className="flex min-h-6 items-center justify-between overflow-hidden px-100 py-0.5"
        >
          <div className="flex min-w-0 items-center gap-1.5">
            <ProfileAvatar className="shrink-0" seed={member.id} size={24} variant="orange" />
            <span className="typo-body2 truncate text-text-strong">{member.name}</span>
          </div>

          {member.isHost ? (
            <span className="typo-label1 shrink-0 rounded-full bg-button-primary-ghost px-2.5 py-100 text-text-primary-alternative">
              방장
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export { RoommateMemberList };

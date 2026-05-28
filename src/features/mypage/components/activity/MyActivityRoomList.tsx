import { useState } from "react";
import { useNavigate } from "react-router";
import { CircleAlertIcon } from "@/assets/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";
import { JoinedRoomCard } from "@/features/mypage/components/activity/JoinedRoomCard";
import { MyPageEmptyState } from "@/features/mypage/components/MyPageEmptyState";
import {
  MY_JOINED_ROOM_ACTIONS,
  MY_JOINED_ROOM_EMPTY_MESSAGE,
  MY_JOINED_ROOM_ERROR_MESSAGE,
} from "@/features/mypage/constants";
import { useLeaveRoommateGroup, useMyRoommateGroups } from "@/features/roommate-group";
import { DORMITORY_LABEL, ROOM_SIZE_LABEL } from "@/constants";
import { useAuthStore } from "@/stores/authStore";

import type {
  MyActivityRoomActionMock,
  MyActivityRoomMemberMock,
  MyActivityRoomMock,
  MyActivityRoomVariant,
} from "@/features/mypage/types";
import type { MyRoommateGroup, RoommateGroupMember } from "@/features/roommate-group";
import { parseDisplayName } from "@/lib/parseDisplayName";

const mapMember = (
  member: RoommateGroupMember,
  currentUserId: number | null,
): MyActivityRoomMemberMock => {
  const isMe = member.userId === currentUserId;

  if (member.role === "LEADER") {
    return {
      id: member.userId,
      isHost: true,
      isMe: isMe ? true : undefined,
      name: parseDisplayName(member.username),
      profileImage: member.profileImage,
    };
  }

  return {
    id: member.userId,
    isMe: isMe ? true : undefined,
    name: parseDisplayName(member.username),
    profileImage: member.profileImage,
  };
};

const getRoomVariant = (
  members: RoommateGroupMember[],
  currentUserId: number | null,
): MyActivityRoomVariant => {
  const currentMember = members.find((member) => member.userId === currentUserId);

  return currentMember?.role === "LEADER" ? "leader" : "member";
};

const mapRoommateGroupToActivityRoom = (
  group: MyRoommateGroup,
  currentUserId: number | null,
): MyActivityRoomMock => {
  const variant = getRoomVariant(group.members, currentUserId);

  return {
    actions: MY_JOINED_ROOM_ACTIONS[variant],
    dormitory: DORMITORY_LABEL[group.dormitory] ?? group.dormitory,
    id: group.groupId,
    members: group.members.map((member) => mapMember(member, currentUserId)),
    postId: group.postId,
    roomType: ROOM_SIZE_LABEL[group.roomSize] ?? group.roomSize,
    status: "joined",
    statusLabel: `${group.currentMemberCount} / ${group.totalCapacity}`,
    title: group.postTitle,
    variant,
  };
};

function MyActivityRoomList() {
  const userId = useAuthStore((state) => state.userId);
  const { data: roommateGroups = [], isError, isLoading } = useMyRoommateGroups();
  const joinedRooms = roommateGroups.map((group) => mapRoommateGroupToActivityRoom(group, userId));

  const navigate = useNavigate();
  const { mutate: leaveRoommateGroup } = useLeaveRoommateGroup();
  const [confirmTarget, setConfirmTarget] = useState<{ roomId: number; type: "withdraw" | "leave" } | null>(null);

  const handleRoomActionClick = (action: MyActivityRoomActionMock, room: MyActivityRoomMock) => {
    if (action.id === "detail") {
      navigate(`/board/${room.postId}`);
    }
    if (action.id === "withdraw") {
      setConfirmTarget({ roomId: room.id, type: "withdraw" });
    }
    if (action.id === "leave") {
      setConfirmTarget({ roomId: room.id, type: "leave" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-400">
        <MyPageEmptyState messages={["Loading..."]} />
      </div>
    );
  }

  if (isError) {
    return <MyPageEmptyState messages={MY_JOINED_ROOM_ERROR_MESSAGE} />;
  }

  return (
    <>
      <div className="flex flex-col gap-400">
        <div className="flex flex-col gap-400">
          {joinedRooms.length > 0 ? (
            joinedRooms.map((room) => (
              <JoinedRoomCard key={room.id} onActionClick={handleRoomActionClick} room={room} />
            ))
          ) : (
            <MyPageEmptyState messages={MY_JOINED_ROOM_EMPTY_MESSAGE} />
          )}
        </div>

        {joinedRooms.length >= 2 ? <RoomLimitNotice count={joinedRooms.length} /> : null}
      </div>

      <AlertDialog open={confirmTarget !== null} onOpenChange={(open) => !open && setConfirmTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center">
              <CircleAlertIcon className="size-14 text-brand-primary" />
            </div>
            <AlertDialogTitle icon>
              {confirmTarget?.type === "withdraw" ? "모집을 철회하시겠어요?" : "방을 나가시겠어요?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmTarget?.type === "withdraw"
                ? `모집을 철회하면 더 이상 다른 사용자가\n이 방에 룸메이트 요청을 보낼 수 없어요`
                : `방을 나가면 더 이상 해당 방의 정보를\n확인할 수 없어요`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col">
            <AlertDialogAction
              onClick={() => {
                if (confirmTarget !== null) leaveRoommateGroup(confirmTarget.roomId);
              }}
            >
              {confirmTarget?.type === "withdraw" ? "철회하기" : "나가기"}
            </AlertDialogAction>
            <AlertDialogCancel>취소하기</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function RoomLimitNotice({ count }: { count: number }) {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-medium border border-dashed border-border-strong px-300 py-300">
      <div className="flex items-center gap-100">
        <CircleAlertIcon
          aria-hidden="true"
          className="size-400 shrink-0 text-state-error"
        />
        <p className="typo-button2 text-state-error">방 참여 한도에 도달했어요</p>
      </div>

      <div className="flex flex-col gap-100 typo-caption2 text-text-caption">
        <p>
          이미 <strong className="font-semibold text-text-strong">소속된 방이 {count}개</strong> 있어요.
        </p>
        <p>
          새로운 방에 참여하려면 기존 방 중 하나를{" "}
          <strong className="font-semibold text-text-strong">먼저 나가야</strong> 해요.
        </p>
      </div>
    </div>
  );
}

export { MyActivityRoomList };

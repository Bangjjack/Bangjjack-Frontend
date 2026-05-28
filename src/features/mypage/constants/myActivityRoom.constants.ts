import type { MyActivityRoomMock, MyActivityRoomVariant } from "@/features/mypage/types";

export const MY_JOINED_ROOM_EMPTY_MESSAGE = [
  "아직 소속된 방이 없어요",
  "룸메이트 요청을 통해 방을 만들어보세요!",
];
export const MY_JOINED_ROOM_ERROR_MESSAGE = ["소속된 방 목록을 불러올 수 없어요."];
export const MY_JOINED_ROOM_ACTIONS: Record<MyActivityRoomVariant, MyActivityRoomMock["actions"]> =
  {
    leader: [
      { id: "detail", label: "모집글 상세 보기", tone: "neutral" },
      { id: "withdraw", label: "모집 철회하기", tone: "primary" },
    ],
    member: [
      { id: "detail", label: "모집글 상세 보기", tone: "neutral" },
      { id: "leave", label: "방 나가기", tone: "dark" },
    ],
  };

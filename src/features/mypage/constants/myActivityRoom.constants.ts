import type { MyActivityRoomMock } from "@/features/mypage/types";

export const MY_JOINED_ROOM_EMPTY_MESSAGE = ["아직 소속된 방이 없어요", "마음에 드는 방에 참여해보세요!"];
export const MY_JOINED_ROOM_ERROR_MESSAGE = ["소속된 방 목록을 불러올 수 없어요."];
export const MY_JOINED_ROOM_ACTIONS: MyActivityRoomMock["actions"] = [
  { id: "detail", label: "모집글 상세 보기", tone: "neutral" },
  { id: "leave", label: "방 나가기", tone: "primary" },
];

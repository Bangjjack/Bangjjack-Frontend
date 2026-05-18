import type { PostWriteFormValues } from "@/features/board/schemas";
import type {
  CreatePostRequest,
  ItemSharing,
  LightsOutTime,
  PhoneCall,
  Recycling,
  RoomSize,
  SharedLifestyle,
} from "@/features/board/types";

const ROOM_TYPE_TO_SIZE: Record<string, RoomSize> = {
  "2인 1실": "TWO_PERSON",
  "3인 1실": "THREE_PERSON",
  "4인 1실": "FOUR_PERSON",
};

const RECYCLING_MAP: Record<string, Recycling> = {
  "분리수거함 공유": "SHARE_BIN",
  "각자 관리": "MANAGE_SEPARATELY",
};

const PHONE_CALL_MAP: Record<string, PhoneCall> = {
  밖에서만: "ONLY_IN_ROOM",
  "짧은 통화는 가능": "SHORT_CALLS_OKAY",
  무관: "NO_PREFERENCE",
};

const ITEM_SHARING_MAP: Record<string, ItemSharing> = {
  "각자 사용": "USE_SEPARATELY",
  "허락 받고 빌리기": "BORROW_WITH_PERMISSION",
  무관: "NO_PREFERENCE",
};

const LIGHTS_OUT_MAP: Record<string, LightsOutTime> = {
  "23시 이전": "BEFORE_23",
  "23~24시": "BETWEEN_23_24",
  "00~01시": "BETWEEN_00_01",
  "01~02시": "BETWEEN_01_02",
  "03시 이후": "AFTER_03",
  무관: "NO_PREFERENCE",
};

function mapHabitsToSharedLifestyle(habits: Record<string, string>): SharedLifestyle {
  // Zod 스키마에서 모든 키 존재를 검증하므로 안전하게 접근
  const get = (key: string) => habits[key] as string;

  return {
    roomTrashBinSharing: get("방 쓰레기통 공유") === "O",
    recycling: RECYCLING_MAP[get("분리수거")] as Recycling,
    phoneCall: PHONE_CALL_MAP[get("전화 통화")] as PhoneCall,
    itemSharing: ITEM_SHARING_MAP[get("물건 공유")] as ItemSharing,
    earphoneUsage: get("이어폰 사용") === "O",
    lightsOutTime: LIGHTS_OUT_MAP[get("소등 시간")] as LightsOutTime,
  };
}

export function mapFormToCreatePostRequest(form: PostWriteFormValues): CreatePostRequest {
  return {
    title: form.title,
    roomSize: ROOM_TYPE_TO_SIZE[form.roomType] as RoomSize,
    recruitMemberCount: form.memberCount,
    description: form.intro ?? "",
    sharedLifestyle: mapHabitsToSharedLifestyle(form.habits),
  };
}

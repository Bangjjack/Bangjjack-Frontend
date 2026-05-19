import type { Campus, RoomSize } from "@/features/board/types";

export const ROOM_FILTERS = ["전체", "2인 1실", "3인 1실", "4인 1실"] as const;

export type RoomFilter = (typeof ROOM_FILTERS)[number];

export const CAMPUS_API_MAP: Record<string, Campus> = {
  "글로벌 캠퍼스": "GLOBAL_CAMPUS",
  "메디컬 캠퍼스": "MEDICAL_CAMPUS",
};

export const ROOM_FILTER_API_MAP: Partial<Record<RoomFilter, RoomSize>> = {
  "2인 1실": "TWO_PERSON",
  "3인 1실": "THREE_PERSON",
  "4인 1실": "FOUR_PERSON",
};

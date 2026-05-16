import { HABIT_CATEGORIES } from "@/constants";
import type { Habit, SharedLifestyle } from "@/features/board/types";

const recyclingMap: Record<string, number> = {
  SHARE_BIN: 0,
  MANAGE_SEPARATELY: 1,
};

const phoneCallMap: Record<string, number> = {
  ONLY_IN_ROOM: 0,
  SHORT_CALLS_OKAY: 1,
  NO_PREFERENCE: 2,
};

const itemSharingMap: Record<string, number> = {
  USE_SEPARATELY: 0,
  BORROW_WITH_PERMISSION: 1,
  NO_PREFERENCE: 2,
};

const lightsOutTimeMap: Record<string, number> = {
  BEFORE_23: 0,
  BETWEEN_23_24: 1,
  BETWEEN_00_01: 2,
  BETWEEN_01_02: 3,
  AFTER_03: 4,
  NO_PREFERENCE: 5,
};

export function mapSharedLifestyleToHabits(lifestyle: SharedLifestyle): Habit[] {
  return HABIT_CATEGORIES.map((category) => {
    let selectedIndex = 0;

    switch (category.label) {
      case "방 쓰레기통 공유":
        selectedIndex = lifestyle.roomTrashBinSharing ? 0 : 1;
        break;
      case "분리수거":
        selectedIndex = recyclingMap[lifestyle.recycling] ?? 0;
        break;
      case "전화 통화":
        selectedIndex = phoneCallMap[lifestyle.phoneCall] ?? 0;
        break;
      case "물건 공유":
        selectedIndex = itemSharingMap[lifestyle.itemSharing] ?? 0;
        break;
      case "이어폰 사용":
        selectedIndex = lifestyle.earphoneUsage ? 0 : 1;
        break;
      case "소등 시간":
        selectedIndex = lightsOutTimeMap[lifestyle.lightsOutTime] ?? 0;
        break;
    }

    return { ...category, selectedIndex };
  });
}

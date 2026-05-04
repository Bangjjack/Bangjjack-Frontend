/** 태그 항목 (선택 여부 포함) */
type TagItem = {
  label: string;
  selected: boolean;
};

/** 기본 태그 카테고리 (학기, 기숙사, 중요하게 생각하는 점 등) */
type BasicTagCategory = {
  title: string;
  tags: TagItem[];
};

/** 생활습관 카테고리 (선택지 목록) */
type HabitCategory = {
  label: string;
  options: readonly string[];
};

/** 생활습관 (읽기 전용, 선택된 인덱스 포함) */
type Habit = HabitCategory & {
  selectedIndex: number;
};

export type { TagItem, BasicTagCategory, HabitCategory, Habit };

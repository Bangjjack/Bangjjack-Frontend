export type HabitCategoryDefinition = {
  label: string;
  options: readonly string[];
};

export const HABIT_CATEGORIES: readonly HabitCategoryDefinition[] = [
  { label: "방 쓰레기통 공유", options: ["O", "X"] },
  { label: "분리수거", options: ["분리수거함 공유", "각자 관리"] },
  { label: "전화 통화", options: ["밖에서만", "짧은 통화는 가능", "무관"] },
  { label: "물건 공유", options: ["각자 사용", "허락 받고 빌리기", "무관"] },
  { label: "이어폰 사용", options: ["O", "X"] },
  {
    label: "소등 시간",
    options: ["23시 이전", "23~24시", "00~01시", "01~02시", "03시 이후", "무관"],
  },
] as const;

export const HABIT_CATEGORY_LABELS = HABIT_CATEGORIES.map((c) => c.label);

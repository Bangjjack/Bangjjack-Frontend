export type MyChecklistSelectionType = "single" | "multi";

export interface MyChecklistSectionMock {
  helperText?: string;
  id: string;
  options: string[];
  selectedOptions: string[];
  selectionType: MyChecklistSelectionType;
  title: string;
}

export const MY_CHECKLIST_LAST_UPDATED = "2026.03.25";

export const MY_CHECKLIST_SECTIONS: MyChecklistSectionMock[] = [
  {
    id: "sleep-time",
    options: ["22시 이전", "22~24시", "24~2시", "2시 이후", "불규칙"],
    selectedOptions: ["24~2시"],
    selectionType: "single",
    title: "취침 시간",
  },
  {
    id: "wake-up-time",
    options: ["6시 이전", "6~8시", "8~10시", "10시 이후", "불규칙"],
    selectedOptions: ["8~10시"],
    selectionType: "single",
    title: "기상 시간",
  },
  {
    helperText: "복수 선택",
    id: "sleeping-habit",
    options: ["없음", "뒤척임", "코골이", "이갈이", "자주 깸"],
    selectedOptions: ["코골이", "자주 깸"],
    selectionType: "multi",
    title: "잠버릇",
  },
  {
    id: "cleaning-cycle",
    options: ["거의 매일", "주 1~2회", "가끔", "거의 안 함"],
    selectedOptions: ["가끔"],
    selectionType: "single",
    title: "청소 주기",
  },
  {
    id: "dorm-stay-duration",
    options: ["대부분 밖에", "절반 정도", "대부분 기숙사 안에"],
    selectedOptions: ["대부분 기숙사 안에"],
    selectionType: "single",
    title: "기숙사 체류 시간",
  },
  {
    id: "noise-sensitivity",
    options: ["둔감한 편", "약간 둔감", "보통", "약간 예민", "예민한 편"],
    selectedOptions: ["예민한 편"],
    selectionType: "single",
    title: "소음 민감도",
  },
  {
    id: "call-habit",
    options: ["기숙사 내부 가능", "밖에서만", "소곤소곤"],
    selectedOptions: ["소곤소곤"],
    selectionType: "single",
    title: "통화 습관",
  },
  {
    id: "indoor-temperature",
    options: ["더위 잘 탐", "추위 잘 탐", "둘 다 예민", "둔감한 편"],
    selectedOptions: ["둘 다 예민"],
    selectionType: "single",
    title: "실내 온도",
  },
  {
    id: "smoking",
    options: ["비흡연", "연초", "전자 담배"],
    selectedOptions: ["전자 담배"],
    selectionType: "single",
    title: "흡연",
  },
];

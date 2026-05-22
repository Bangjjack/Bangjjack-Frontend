import { MY_PROFILE } from "@/features/mypage/mocks";
import type { MyProfileEditFormValues } from "@/features/mypage/schemas";

export const AGE_OPTIONS = ["18", "19", "20", "21", "22", "23", "24", "25"] as const;

export const DEPARTMENT_OPTIONS = [
  "컴퓨터공학과",
  "소프트웨어학과",
  "정보통신공학과",
  "전자공학과",
  "경영학과",
] as const;

export const MY_PROFILE_EDIT_FORM_ID = "my-profile-edit-form";

export const MY_PROFILE_EDIT_DEFAULT_VALUES: MyProfileEditFormValues = {
  age: "20",
  department: MY_PROFILE.department,
  grade: MY_PROFILE.grade,
  name: MY_PROFILE.name,
};

export const PROFILE_PLACEHOLDER = {
  age: "나이",
  department: "학과를 선택해 주세요",
  name: "이름을 입력해 주세요",
} as const;

export const SELECT_TRIGGER_CLASS_NAME =
  "h-11 rounded-medium border-[1.5px] border-border-normal bg-bg-secondary px-300 typo-body1";

export const WAVE_BACKGROUND_CLASS_NAME = "absolute left-0 -top-0.75 w-full";

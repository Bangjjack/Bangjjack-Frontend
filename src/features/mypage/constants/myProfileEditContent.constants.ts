import { MY_PROFILE } from "@/features/mypage/mocks";
import type { MyProfileEditFormValues } from "@/features/mypage/schemas";

export const CAMPUS_OPTIONS = ["글로벌 캠퍼스", "메디컬 캠퍼스"] as const;

export const DEPARTMENT_OPTIONS = [
  "컴퓨터공학과",
  "소프트웨어학과",
  "정보통신공학과",
  "전자공학과",
  "경영학과",
] as const;

export const DORMITORY_OPTIONS = ["1 기숙사", "2 기숙사", "3 기숙사"] as const;

export const GENDER_OPTIONS = ["남성", "여성"] as const;

export const GRADE_OPTIONS = ["1", "2", "3", "4"] as const;

export const MY_PROFILE_EDIT_FORM_ID = "my-profile-edit-form";

export const MY_PROFILE_EDIT_DEFAULT_VALUES: MyProfileEditFormValues = {
  birthYear: MY_PROFILE.birthYear,
  campus: MY_PROFILE.campus,
  department: MY_PROFILE.department,
  dormitory: MY_PROFILE.dormitory,
  email: MY_PROFILE.email,
  gender: MY_PROFILE.gender,
  grade: MY_PROFILE.grade,
  name: MY_PROFILE.name,
  semester: MY_PROFILE.semester,
};

export const PROFILE_PLACEHOLDER = {
  birthYear: "출생년도를 선택해 주세요",
  campus: "캠퍼스를 선택해 주세요",
  department: "학과를 선택해 주세요",
  fixed: "변경 불가능한 정보",
  grade: "학년",
} as const;

export const SELECT_TRIGGER_CLASS_NAME =
  "h-11 rounded-small border border-border-normal bg-bg-secondary px-300 typo-body1";

export const WAVE_BACKGROUND_CLASS_NAME = "absolute left-0 -top-0.75 w-full";

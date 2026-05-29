import { z } from "zod";

import { GRADE_OPTIONS } from "@/features/mypage/constants";

export const myProfileEditSchema = z.object({
  birthYear: z.string().trim().regex(/^\d+$/, "출생년도는 숫자만 입력 가능합니다"),
  campus: z.string().trim().min(1, "캠퍼스를 선택해 주세요"),
  department: z.string().trim().min(1, "학과를 선택해 주세요"),
  departmentId: z.number().int().positive().nullable(),
  dormitory: z.string().trim().min(1, "기숙사를 선택해 주세요"),
  email: z.string().trim().min(1, "이메일을 확인해 주세요"),
  gender: z.string().trim().min(1, "성별을 선택해 주세요"),
  grade: z.enum(GRADE_OPTIONS, { message: "학년은 숫자만 입력 가능합니다" }),
  name: z.string().trim().min(1, "이름을 입력해 주세요"),
  semester: z.string().trim().min(1, "학기를 선택해 주세요"),
});

export type MyProfileEditFormValues = z.infer<typeof myProfileEditSchema>;

import { z } from "zod";

import { GRADE_OPTIONS } from "@/features/mypage/constants";

export const myProfileEditSchema = z.object({
  birthYear: z.string().trim().min(1, "출생년도를 선택해 주세요"),
  campus: z.string().trim().min(1, "캠퍼스를 선택해 주세요"),
  department: z.string().trim().min(1, "학과를 선택해 주세요"),
  dormitory: z.string().trim().min(1, "기숙사를 선택해 주세요"),
  email: z.string().trim().min(1, "이메일을 확인해 주세요"),
  gender: z.string().trim().min(1, "성별을 선택해 주세요"),
  grade: z.enum(GRADE_OPTIONS, { message: "학년을 선택해 주세요" }),
  name: z.string().trim().min(1, "이름을 입력해 주세요"),
  semester: z.string().trim().min(1, "학기를 선택해 주세요"),
});

export type MyProfileEditFormValues = z.infer<typeof myProfileEditSchema>;

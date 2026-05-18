import { z } from "zod";

import { AGE_OPTIONS } from "@/features/mypage/constants";

export const myProfileEditSchema = z.object({
  age: z.enum(AGE_OPTIONS, { message: "나이를 선택해 주세요" }),
  department: z.string().trim().min(1, "학과를 선택해 주세요"),
  name: z.string().trim().min(1, "이름을 입력해 주세요"),
});

export type MyProfileEditFormValues = z.infer<typeof myProfileEditSchema>;

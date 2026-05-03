import { z } from "zod";

export const HABIT_CATEGORY_LABELS = [
  "방 쓰레기통 공유",
  "분리수거",
  "전화 통화",
  "물건 공유",
  "이어폰 사용",
  "소등 시간",
] as const;

export const postWriteSchema = z.object({
  title: z.string().trim().min(1, "제목을 입력해주세요").max(40, "제목은 40자 이하로 입력해주세요"),

  memberCount: z
    .number()
    .int()
    .min(1, "인원 수는 최소 1명입니다")
    .max(4, "최대 4명까지 가능합니다"),

  roomType: z.string().min(1, "방 타입을 선택해주세요"),

  intro: z
    .string()
    .trim()
    .max(500, "소개는 500자 이하로 입력해주세요")
    .optional()
    .or(z.literal("")),

  habits: z
    .record(z.string(), z.string())
    .refine(
      (value) => HABIT_CATEGORY_LABELS.every((label) => label in value),
      "생활 습관을 모두 입력해주세요",
    ),
});

export type PostWriteFormValues = z.infer<typeof postWriteSchema>;

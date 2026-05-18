import type { PostWriteFormValues } from "@/features/board/schemas";

export const ROOM_TYPE_MAX_MEMBER: Record<string, number> = {
  "2인 1실": 1,
  "3인 1실": 2,
  "4인 1실": 3,
};

export const DEFAULT_MAX_MEMBER = 3;

export const EMPTY_POST_FORM_VALUES: PostWriteFormValues = {
  title: "",
  memberCount: 1,
  roomType: "",
  intro: "",
  habits: {},
};

import { Tag } from "@/components/ui";
import type { PostStatus } from "@/types";

export const STATUS_LABEL: Record<PostStatus, string> = {
  OPEN: "모집중",
  CLOSED: "마감",
};

export const STATUS_TAG_COLOR: Record<PostStatus, React.ComponentProps<typeof Tag>["color"]> = {
  OPEN: "black",
  CLOSED: "disabled",
};

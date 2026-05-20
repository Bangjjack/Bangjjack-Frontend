import { HABIT_CATEGORIES, ROOM_SIZE_LABEL } from "@/constants";
import type { PostWriteFormValues } from "@/features/board/schemas";
import type { PostDetail } from "@/features/board/types";
import { mapSharedLifestyleToHabits } from "./mapSharedLifestyleToHabits";

export function mapPostDetailToFormValues(post: PostDetail): PostWriteFormValues {
  const habitEntries = mapSharedLifestyleToHabits(post.sharedLifestyle);

  const habits: Record<string, string> = {};
  for (const habit of habitEntries) {
    const category = HABIT_CATEGORIES.find((c) => c.label === habit.label);
    const option = category?.options[habit.selectedIndex];
    if (option) {
      habits[habit.label] = option;
    }
  }

  return {
    title: post.title,
    memberCount: post.recruitMemberCount,
    roomType: ROOM_SIZE_LABEL[post.roomSize] ?? "",
    intro: post.description,
    habits,
  };
}

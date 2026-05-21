import { Card, Separator, Tag } from "@/components/ui";
import { ROOMMATE_PREFERENCE_LABEL } from "@/constants";
import { HabitList } from "@/features/board/components/shared";
import type { Habit } from "@/features/board/types";

interface PostDetailTagsCardProps {
  habits: Habit[];
  roommatePreferences?: string[];
}

function PostDetailTagsCard({ habits, roommatePreferences }: PostDetailTagsCardProps) {
  return (
    <Card className="gap-500 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
      <h3 className="typo-title1 text-text-strong">태그</h3>

      {roommatePreferences && roommatePreferences.length > 0 && (
        <>
          <div className="flex flex-col gap-[10px]">
            <span className="typo-title2 text-text-strong">이런 점을 중요하게 생각해요</span>
            <div className="flex flex-wrap gap-[4px]">
              {roommatePreferences.map((pref) => (
                <Tag key={pref} color="black">
                  {ROOMMATE_PREFERENCE_LABEL[pref as keyof typeof ROOMMATE_PREFERENCE_LABEL] ??
                    pref}
                </Tag>
              ))}
            </div>
          </div>

          <Separator />
        </>
      )}

      <HabitList habits={habits} />
    </Card>
  );
}

export { PostDetailTagsCard };

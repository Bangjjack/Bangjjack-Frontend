import { CheckIcon } from "@/assets/icons";
import { Card, Separator, Tag } from "@/components/ui";
import { ROOMMATE_PREFERENCE_LABEL } from "@/constants";
import { HabitList } from "@/features/board/components/shared";
import type { Habit, PostRoommatePreference } from "@/features/board/types";

interface PostDetailTagsCardProps {
  habits: Habit[];
  roommatePreference?: PostRoommatePreference;
}

function PostDetailTagsCard({ habits, roommatePreference }: PostDetailTagsCardProps) {
  const priorities = roommatePreference
    ? [
        roommatePreference.firstPriority,
        roommatePreference.secondPriority,
        roommatePreference.thirdPriority,
      ]
    : [];

  return (
    <Card className="gap-500 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
      <h3 className="typo-title1 text-text-strong">태그</h3>

      {priorities.length > 0 && (
        <>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-200">
              <CheckIcon className="size-400 text-brand-primary" />
              <span className="typo-title2 text-text-strong">이런 점을 중요하게 생각해요</span>
            </div>
            <div className="flex flex-wrap gap-[6px]">
              {priorities.map((pref, index) => (
                <Tag key={pref} rank={index + 1}>
                  {ROOMMATE_PREFERENCE_LABEL[pref] ?? pref}
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

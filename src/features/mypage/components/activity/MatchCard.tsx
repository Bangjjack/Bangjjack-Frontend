import { ProfileAvatar } from "@/components/ui";
import { ActivityButton } from "@/features/mypage/components/activity/ActivityButton";
import { ActivityTag } from "@/features/mypage/components/activity/ActivityTag";
import { cn } from "@/lib/cn";

import type { MyActivityMatchMock } from "@/features/mypage/types";

interface MatchCardProps {
  className?: string;
  match: MyActivityMatchMock;
}

function MatchCard({ className, match }: MatchCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col items-start justify-center gap-2.5 rounded-2xl border border-border-normal bg-bg-secondary p-400",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between gap-300 overflow-hidden">
        <div className="flex min-w-0 items-center gap-2.5">
          <ProfileAvatar className="shrink-0" seed={match.id} size={40} variant="orange" />
          <div className="flex min-w-0 flex-col items-start gap-100 text-center">
            <h3 className="typo-label1 truncate text-text-normal">{match.name}</h3>
            <p className="typo-label3 truncate text-text-caption">
              {match.age}살 · {match.department}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-center text-center">
          <span className="typo-title1 font-extrabold text-icon-primary-normal">
            {match.matchRate}%
          </span>
          <span className="typo-label1 text-text-disabled">매칭률</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {match.tags.map((tag) => (
          <ActivityTag key={tag}>{tag}</ActivityTag>
        ))}
      </div>

      <div className="grid w-full grid-cols-2 gap-200">
        {match.actions.map((action) => (
          <ActivityButton key={action.id} label={action.label} tone={action.tone} />
        ))}
      </div>
    </article>
  );
}

export { MatchCard };

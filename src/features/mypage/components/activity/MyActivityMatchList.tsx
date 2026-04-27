import { ProfileAvatar } from "@/components/ui";
import { ActivityButton } from "@/features/mypage/components/activity/ActivityButton";
import { ActivityTag } from "@/features/mypage/components/activity/ActivityTag";
import { MY_ACTIVITY_MATCHES } from "@/features/mypage/mocks";

import type { MyActivityMatchMock } from "@/features/mypage/mocks";

function MyActivityMatchList() {
  if (MY_ACTIVITY_MATCHES.length === 0) {
    return <MyActivityMatchEmptyState />;
  }

  return (
    <div className="flex flex-col gap-400">
      <h2 className="typo-title2 text-text-normal">매칭된 룸메이트</h2>
      <div className="flex flex-col gap-400">
        {MY_ACTIVITY_MATCHES.map((match) => (
          <MyActivityMatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}

function MyActivityMatchCard({ match }: { match: MyActivityMatchMock }) {
  return (
    <article className="flex flex-col gap-2.5 rounded-2xl border border-border-normal p-400">
      <div className="flex items-center justify-between gap-300">
        <div className="flex min-w-0 items-center gap-2.5">
          <ProfileAvatar seed={match.name.length} size={40} />
          <div className="flex min-w-0 flex-col gap-100">
            <h3 className="typo-title4 text-text-normal">{match.name}</h3>
            <p className="typo-label3 text-text-caption">
              {match.age}살 · {match.department}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <span className="typo-title1 text-text-primary-alternative">{match.matchRate}%</span>
          <span className="typo-label2 text-text-disabled">매칭률</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {match.tags.map((tag) => (
          <ActivityTag key={tag}>{tag}</ActivityTag>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-200">
        {match.actions.map((action) => (
          <ActivityButton key={action.id} label={action.label} tone={action.tone} />
        ))}
      </div>
    </article>
  );
}

function MyActivityMatchEmptyState() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl p-400">
      <p className="typo-caption1 text-center text-text-disabled">아직 매칭 내역이 없어요</p>
    </div>
  );
}

export { MyActivityMatchList };

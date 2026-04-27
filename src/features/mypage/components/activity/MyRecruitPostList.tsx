import { ActivityButton } from "@/features/mypage/components/activity/ActivityButton";
import { ActivityStat } from "@/features/mypage/components/activity/ActivityStat";
import { ActivityTag } from "@/features/mypage/components/activity/ActivityTag";
import {
  MY_RECRUIT_POST_EMPTY_MESSAGE,
  MY_RECRUIT_POSTS,
} from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

import type { MyRecruitPostMock } from "@/features/mypage/mocks";

function MyRecruitPostList() {
  if (MY_RECRUIT_POSTS.length === 0) {
    return <MyRecruitPostEmptyState />;
  }

  return (
    <div className="flex flex-col gap-400">
      {MY_RECRUIT_POSTS.map((post) => (
        <MyRecruitPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function MyRecruitPostCard({ post }: { post: MyRecruitPostMock }) {
  return (
    <article className="flex flex-col gap-2.5 rounded-2xl border border-border-normal p-400">
      <div className="flex items-start justify-between gap-300">
        <h2 className="typo-title3 min-w-0 flex-1 text-text-strong">{post.title}</h2>
        <span
          className={cn(
            "typo-label1 shrink-0 rounded-full px-2.5 py-0.5",
            post.status === "open"
              ? "bg-text-strong text-text-on-primary"
              : "bg-button-disabled text-text-caption",
          )}
        >
          {post.statusLabel}
        </span>
      </div>

      <p className="typo-caption2 whitespace-pre-line text-text-caption">{post.description}</p>

      <div className="flex gap-2.5">
        <ActivityTag>{post.dormitory}</ActivityTag>
        <ActivityTag>{post.roomType}</ActivityTag>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {post.stats.map((stat) => (
          <ActivityStat key={stat.id} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-200">
        {post.actions.map((action) => (
          <ActivityButton key={action.id} label={action.label} tone={action.tone} />
        ))}
      </div>
    </article>
  );
}

function MyRecruitPostEmptyState() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl p-400">
      <p className="typo-caption1 whitespace-pre-line text-center text-text-disabled">
        {MY_RECRUIT_POST_EMPTY_MESSAGE.join("\n")}
      </p>
    </div>
  );
}

export { MyRecruitPostList };

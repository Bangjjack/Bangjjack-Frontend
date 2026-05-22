import { Surface, Tag } from "@/components/ui";
import { ActivityButton } from "@/features/mypage/components/activity/ActivityButton";
import { ActivityStat } from "@/features/mypage/components/activity/ActivityStat";
import { ActivityTag } from "@/features/mypage/components/activity/ActivityTag";
import { MY_RECRUIT_POST_EMPTY_MESSAGE, MY_RECRUIT_POSTS } from "@/features/mypage/mocks";

import type { MyRecruitPostMock } from "@/features/mypage/types";

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
  const currentMemberStat = post.stats.find((stat) => stat.id === "current-members");

  return (
    <Surface as="article" variant="outlined" className="flex flex-col gap-2.5">
      <div className="flex items-start justify-between gap-300">
        <h2 className="typo-title3 min-w-0 flex-1 text-text-strong">{post.title}</h2>
        <Tag color={post.status === "open" ? "black" : "disabled"}>{post.statusLabel}</Tag>
      </div>

      <p className="typo-caption2 whitespace-pre-line text-text-caption">{post.description}</p>

      <div className="flex gap-2.5">
        <ActivityTag>{post.dormitory}</ActivityTag>
        <ActivityTag>{post.roomType}</ActivityTag>
      </div>

      {currentMemberStat ? (
        <RecruitPostMemberStat label={currentMemberStat.label} value={currentMemberStat.value} />
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {post.stats.map((stat) => (
            <ActivityStat key={stat.id} label={stat.label} value={stat.value} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-200">
        {post.actions.map((action) => (
          <ActivityButton key={action.id} label={action.label} tone={action.tone} />
        ))}
      </div>
    </Surface>
  );
}

function RecruitPostMemberStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-12.5 w-full items-center justify-center gap-200 rounded-medium bg-bg-primary">
      <span className="typo-caption1 text-text-placeholder">{label}</span>
      <span className="typo-title2 text-text-strong">{value}</span>
    </div>
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

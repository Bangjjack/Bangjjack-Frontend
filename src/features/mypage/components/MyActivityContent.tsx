import { Button } from "@/components/ui";
import {
  MY_ACTIVITY_ACTIVE_TAB_ID,
  MY_ACTIVITY_TABS,
  MY_RECRUIT_POSTS,
} from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

import type {
  MyRecruitPostActionTone,
  MyRecruitPostMock,
} from "@/features/mypage/mocks";
import type { ButtonProps } from "@/components/ui";

export interface MyActivityContentProps {
  className?: string;
}

function MyActivityContent({ className }: MyActivityContentProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-400 overflow-hidden rounded-[20px] border border-border-normal bg-bg-secondary p-400",
        className,
      )}
    >
      <div className="grid grid-cols-3">
        {MY_ACTIVITY_TABS.map((tab) => {
          const isActive = tab.id === MY_ACTIVITY_ACTIVE_TAB_ID;

          return (
            <button
              key={tab.id}
              className={cn(
                "typo-title3 min-w-0 border-b py-2.5 text-center cursor-pointer",
                isActive
                  ? "border-b-2 border-brand-primary text-brand-primary"
                  : "border-border-normal text-text-placeholder",
              )}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-400">
        {MY_RECRUIT_POSTS.map((post) => (
          <MyRecruitPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
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
          <Button
            key={action.id}
            className="h-9 py-200 cursor-pointer"
            size="sm"
            type="button"
            variant={getActionButtonVariant(action.tone)}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </article>
  );
}

function ActivityTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="typo-label1 rounded-full bg-brand-primary-light px-200 py-100 text-brand-primary">
      {children}
    </span>
  );
}

function ActivityStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-200 rounded-2xl bg-bg-primary p-2.5">
      <span className="typo-label2 text-text-placeholder">{label}</span>
      <span className="typo-title3 text-text-strong">{value}</span>
    </div>
  );
}

function getActionButtonVariant(tone: MyRecruitPostActionTone): ButtonProps["variant"] {
  if (tone === "dark") {
    return "black";
  }

  if (tone === "neutral") {
    return "neutral";
  }

  return "default";
}

export { MyActivityContent };

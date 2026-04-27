import { useState } from "react";

import { Button, ProfileAvatar } from "@/components/ui";
import {
  MY_ACTIVITY_ACTIVE_ROOM_FILTER_ID,
  MY_ACTIVITY_ACTIVE_TAB_ID,
  MY_ACTIVITY_MATCHES,
  MY_ACTIVITY_ROOM_FILTERS,
  MY_ACTIVITY_ROOMS,
  MY_ACTIVITY_TABS,
  MY_RECRUIT_POST_EMPTY_MESSAGE,
  MY_RECRUIT_POSTS,
} from "@/features/mypage/mocks";
import { cn } from "@/lib/cn";

import type {
  MyActivityMatchMock,
  MyActivityRoomFilterId,
  MyActivityRoomMock,
  MyActivityTabId,
  MyRecruitPostActionTone,
  MyRecruitPostMock,
} from "@/features/mypage/mocks";
import type { ButtonProps } from "@/components/ui";

export interface MyActivityContentProps {
  className?: string;
}

function MyActivityContent({ className }: MyActivityContentProps) {
  const [activeTabId, setActiveTabId] = useState<MyActivityTabId>(MY_ACTIVITY_ACTIVE_TAB_ID);

  return (
    <section
      className={cn(
        "flex flex-col gap-400 overflow-hidden rounded-[20px] border border-border-normal bg-bg-secondary p-400",
        className,
      )}
    >
      <div className="grid grid-cols-3">
        {MY_ACTIVITY_TABS.map((tab) => {
          const isActive = tab.id === activeTabId;

          return (
            <button
              key={tab.id}
              className={cn(
                "typo-title3 min-w-0 cursor-pointer border-b py-2.5 text-center",
                isActive
                  ? "border-b-2 border-brand-primary text-brand-primary"
                  : "border-border-normal text-text-placeholder",
              )}
              onClick={() => setActiveTabId(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTabId === "posts" ? <MyRecruitPostList /> : null}
      {activeTabId === "rooms" ? <MyActivityRoomList /> : null}
      {activeTabId === "matches" ? <MyActivityMatchList /> : null}
    </section>
  );
}

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

function MyActivityRoomList() {
  const [activeFilterId, setActiveFilterId] = useState<MyActivityRoomFilterId>(
    MY_ACTIVITY_ACTIVE_ROOM_FILTER_ID,
  );
  const filteredRooms =
    activeFilterId === "pending"
      ? MY_ACTIVITY_ROOMS.filter((room) => room.status === "pending")
      : MY_ACTIVITY_ROOMS;

  return (
    <div className="flex flex-col gap-400">
      <div className="flex flex-wrap gap-200">
        {MY_ACTIVITY_ROOM_FILTERS.map((filter) => {
          const isActive = filter.id === activeFilterId;

          return (
            <button
              key={filter.id}
              className={cn(
                "typo-button2 cursor-pointer rounded-full px-300 py-200",
                isActive
                  ? "border border-brand-primary bg-brand-primary-light text-text-primary-normal"
                  : "bg-bg-input text-text-alternative",
              )}
              onClick={() => setActiveFilterId(filter.id)}
              type="button"
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-400">
        {filteredRooms.map((room) => (
          <MyActivityRoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}

function MyActivityRoomCard({ room }: { room: MyActivityRoomMock }) {
  return (
    <article className="flex flex-col gap-3.5 rounded-2xl border border-border-normal p-400">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-300">
          <h2 className="typo-title3 min-w-0 flex-1 text-text-strong">{room.title}</h2>
          <span className="typo-label1 shrink-0 rounded-full bg-neutral-800 px-2.5 py-100 text-neutral-50">
            {room.statusLabel}
          </span>
        </div>

        <div className="flex gap-100">
          <ActivityTag>{room.roomType}</ActivityTag>
          <ActivityTag>{room.dormitory}</ActivityTag>
        </div>
      </div>

      {room.status === "joined" ? (
        <>
          <div className="h-px w-full bg-border-normal" aria-hidden="true" />
          <RoomMemberList members={room.members ?? []} />
        </>
      ) : (
        <div className="rounded-small bg-bg-primary p-2.5">
          <p className="typo-caption2 text-text-caption">{room.waitingMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-200">
        {room.actions.map((action) => (
          <ActivityButton key={action.id} label={action.label} tone={action.tone} />
        ))}
      </div>
    </article>
  );
}

function RoomMemberList({ members }: { members: NonNullable<MyActivityRoomMock["members"]> }) {
  return (
    <div className="flex flex-col gap-200 rounded-small bg-bg-primary px-2.5 py-3.5">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between gap-300 px-100 py-0.5">
          <div className="flex items-center gap-1.5">
            <ProfileAvatar seed={member.name.length} size={24} />
            <span className="typo-body2 text-text-strong">{member.name}</span>
          </div>
          {member.isHost ? (
            <span className="typo-label1 rounded-full bg-button-primary-ghost px-2.5 py-100 text-text-primary-alternative">
              방장
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

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

function MyRecruitPostEmptyState() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl p-400">
      <p className="typo-caption1 whitespace-pre-line text-center text-text-disabled">
        {MY_RECRUIT_POST_EMPTY_MESSAGE.join("\n")}
      </p>
    </div>
  );
}

function MyActivityMatchEmptyState() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl p-400">
      <p className="typo-caption1 text-center text-text-disabled">아직 매칭 내역이 없어요</p>
    </div>
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

function ActivityButton({
  label,
  tone,
}: {
  label: string;
  tone: MyRecruitPostActionTone;
}) {
  return (
    <Button
      className="h-9 cursor-pointer py-200"
      size="sm"
      type="button"
      variant={getActionButtonVariant(tone)}
    >
      {label}
    </Button>
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

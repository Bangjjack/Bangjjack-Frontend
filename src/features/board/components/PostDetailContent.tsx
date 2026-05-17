import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { BookmarkFilledIcon, BookmarkIcon } from "@/assets/icons";
import { Button, Card, Header, ProfileAvatar, Separator, Tag } from "@/components/ui";
import { useGoBack } from "@/hooks/useGoBack";

import { ROOMMATE_PREFERENCE_LABEL } from "@/constants";
import { DORMITORY_LABEL, ROOM_SIZE_LABEL, ROOM_SIZE_MAX, SEMESTER_LABEL } from "@/features/board/constants";
import { usePostDetail } from "@/features/board/hooks";
import { formatRelativeTime, mapSharedLifestyleToHabits } from "@/features/board/utils";

import {
  HabitList,
  MatchAlertDialog,
  PostActionMenu,
  RoommateList,
} from "@/features/board/components";

function PostDetailContent() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const handleBackClick = useGoBack("/board");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: post, isLoading, isError } = usePostDetail(postId);

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center bg-bg-primary">
        <span className="typo-body2 text-text-caption">로딩 중...</span>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="flex h-dvh items-center justify-center bg-bg-primary">
        <span className="typo-body2 text-text-caption">게시글을 불러올 수 없습니다.</span>
      </div>
    );
  }

  const habits = mapSharedLifestyleToHabits(post.sharedLifestyle);
  const recruitTags = [
    SEMESTER_LABEL[post.semester] ?? post.semester,
    DORMITORY_LABEL[post.dormitory] ?? post.dormitory,
    ROOM_SIZE_LABEL[post.roomSize] ?? post.roomSize,
  ];

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      {/* Fixed header */}
      <Header
        showBack
        showMore={post.isOwner}
        title="방 찾기"
        onBackClick={handleBackClick}
        onMoreClick={() => setIsMenuOpen((prev) => !prev)}
      />

      {/* More menu dropdown + delete dialog */}
      <PostActionMenu postId={id!} isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(false)} />

      {/* Scrollable content */}
      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto pb-[100px] pt-400">
        <div className="flex flex-col gap-300 px-400">
          {/* Card 1 - 상단 정보 */}
          <Card className="gap-0 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
            <div className="flex flex-col gap-300">
              {/* 제목 + 인원 */}
              <div className="flex items-center justify-between">
                <h2 className="typo-h4 text-text-strong">{post.title}</h2>
                <Tag color="black">
                  {post.recruitMemberCount} / {ROOM_SIZE_MAX[post.roomSize] ?? 0}
                </Tag>
              </div>

              {/* 작성자 + 시간 */}
              <div className="flex items-center gap-200">
                <ProfileAvatar size={24} seed={post.author.authorId} />
                <span className="typo-caption1 text-text-caption">{post.author.username}</span>
                <span className="typo-caption2 ml-auto text-text-disabled">
                  {formatRelativeTime(post.createdAt)}
                </span>
              </div>
            </div>
          </Card>

          {/* Card 2 - 본문 + 모집 태그 */}
          <Card className="gap-600 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
            <p className="typo-body2 whitespace-pre-wrap text-text-normal">{post.description}</p>
            <div className="flex flex-wrap gap-[6px]">
              {recruitTags.map((tag) => (
                <Tag key={tag} color="default">
                  {tag}
                </Tag>
              ))}
            </div>
          </Card>

          {/* Card 3 - 공동 생활습관 */}
          <Card className="gap-500 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
            <h3 className="typo-title1 text-text-strong">태그</h3>

            {/* 중요하게 생각하는 점 */}
            {post.roommatePreferences && post.roommatePreferences.length > 0 && (
              <>
                <div className="flex flex-col gap-[10px]">
                  <span className="typo-title2 text-text-strong">이런 점을 중요하게 생각해요</span>
                  <div className="flex flex-wrap gap-[4px]">
                    {post.roommatePreferences.map((pref) => (
                      <Tag key={pref} color="black">
                        {ROOMMATE_PREFERENCE_LABEL[pref as keyof typeof ROOMMATE_PREFERENCE_LABEL] ?? pref}
                      </Tag>
                    ))}
                  </div>
                </div>

                <Separator />
              </>
            )}
            <HabitList habits={habits} />
          </Card>

          {/* Card 4 - 룸메이트 목록 */}
          <Card className="gap-400 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
            <button
              type="button"
              className="flex cursor-pointer flex-col gap-100 text-left"
              onClick={() => navigate(`/board/${id}/roommates`)}
            >
              <h3 className="typo-title1 text-text-strong">룸메이트 목록</h3>
              <span className="typo-caption2 text-text-caption">
                프로필을 선택하면 체크리스트를 확인할 수 있어요
              </span>
            </button>

            <RoommateList
              members={[
                {
                  nickname: post.author.username,
                  seed: post.author.authorId,
                  isHost: true,
                },
              ]}
            />
          </Card>
        </div>
      </main>

      {/* Fixed bottom bar */}
      <div className="absolute inset-x-0 bottom-0 z-40 flex items-center gap-[10px] bg-bg-primary px-400 pb-9 pt-300">
        <button
          type="button"
          aria-label={isBookmarked ? "북마크 해제" : "북마크"}
          className="flex size-[30px] shrink-0 items-center justify-center"
          onClick={() => setIsBookmarked((prev) => !prev)}
        >
          {isBookmarked ? (
            <BookmarkFilledIcon className="size-[30px] text-brand-primary" />
          ) : (
            <BookmarkIcon className="size-[30px]" />
          )}
        </button>

        {post.isOwner ? (
          <Button className="flex-1" onClick={() => navigate("/chat")}>
            채팅 확인
          </Button>
        ) : (
          <>
            <MatchAlertDialog matchRate={0} matchDetails="" onConfirm={() => navigate("/chat")}>
              <Button className="flex-1" variant="ghost">
                매칭하기
              </Button>
            </MatchAlertDialog>

            <MatchAlertDialog matchRate={0} matchDetails="" onConfirm={() => navigate("/chat")}>
              <Button className="flex-1">채팅하기</Button>
            </MatchAlertDialog>
          </>
        )}
      </div>
    </div>
  );
}

export { PostDetailContent };

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { BookmarkFilledIcon, BookmarkIcon } from "@/assets/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogTitle,
  Button,
  Card,
  Header,
  ProfileAvatar,
  Separator,
  Tag,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import { useGoBack } from "@/hooks/useGoBack";

import { HabitList } from "./HabitList";
import { MatchAlertDialog } from "./MatchAlertDialog";
import { RoommateList } from "./RoommateList";

// TODO: API 연동 시 제거
const MOCK_POST = {
  title: "글캠 기숙사 2인실 룸메 구해요!",
  currentMembers: 1,
  maxMembers: 2,
  author: { nickname: "무구정광대다라니경", seed: 1 },
  timeAgo: "3분 전",
  description:
    "깔끔한 편이고 조용한 성격입니다. 코골이 없고 잠버릇도 없어요. 새벽 1시 전에는 자는 편이라 비슷한 분이면 좋겠습니다. 청소는 일주일에 한 번 정도 하고, 환기도 자주 해요. 편하게 연락 주세요!",
  recruitTags: ["학기 (16주)", "3 기숙사", "2인 1실"],
  importanceTags: ["취침 시간", "기상 시간", "기숙사 체류 시간"],
  habits: [
    {
      label: "방 쓰레기통 공유",
      options: ["O", "X"],
      selectedIndex: 1,
    },
    {
      label: "분리수거",
      options: ["분리수거함 공유", "각자 관리"],
      selectedIndex: 0,
    },
    {
      label: "전화 통화",
      options: ["밖에서만", "짧은 통화는 가능", "무관"],
      selectedIndex: 0,
    },
    {
      label: "물건 공유",
      options: ["각자 사용", "허락 받고 빌리기", "무관"],
      selectedIndex: 0,
    },
    {
      label: "이어폰 사용",
      options: ["O", "X"],
      selectedIndex: 0,
    },
    {
      label: "소등 시간",
      options: ["23시 이전", "23~24시", "00~01시", "01~02시", "03시 이후", "무관"],
      selectedIndex: 0,
    },
  ],
  members: [
    { nickname: "무구정광대다라니경", seed: 1, isHost: true },
    { nickname: "햄무라비법전", seed: 2 },
    { nickname: "직지심체요절", seed: 3 },
  ],
  matchRate: 92,
  matchDetails: "청소 빈도, 흡연 여부",
  isMine: true, // TODO: API 연동 시 실제 판별 로직으로 교체
};

function PostDetailContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackClick = useGoBack("/board");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  function handleDeleteConfirm() {
    // TODO: 삭제 API 연동
    navigate("/board");
  }

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      {/* Fixed header */}
      <Header
        showBack
        showMore={MOCK_POST.isMine}
        title="방 찾기"
        onBackClick={handleBackClick}
        onMoreClick={() => setIsMenuOpen((prev) => !prev)}
      />

      {/* More menu dropdown */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="animate-dropdown-panel absolute right-400 top-[72px] z-50 flex w-[120px] flex-col gap-100 overflow-hidden rounded-medium bg-bg-secondary px-100 py-100 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]"
        >
          <button
            type="button"
            className="w-full cursor-pointer rounded-medium px-[10px] py-200 text-left font-medium text-text-strong typo-body1 transition-colors hover:bg-neutral-100"
            onClick={() => {
              setIsMenuOpen(false);
              navigate(`/board/${id}/edit`);
            }}
          >
            수정
          </button>
          <button
            type="button"
            className={cn(
              "w-full cursor-pointer rounded-medium px-[10px] py-200 text-left font-medium typo-body1 transition-colors",
              "text-state-error hover:bg-neutral-100",
            )}
            onClick={() => {
              setIsMenuOpen(false);
              setIsDeleteDialogOpen(true);
            }}
          >
            삭제
          </button>
        </div>
      )}

      {/* Scrollable content */}
      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto pb-[100px]">
        <div className="flex flex-col gap-300 px-400">
          {/* Card 1 - 상단 정보 */}
          <Card className="gap-0 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
            <div className="flex flex-col gap-300">
              {/* 제목 + 인원 */}
              <div className="flex items-center justify-between">
                <h2 className="typo-h4 text-text-strong">{MOCK_POST.title}</h2>
                <Tag color="black">
                  {MOCK_POST.currentMembers} / {MOCK_POST.maxMembers}
                </Tag>
              </div>

              {/* 작성자 + 시간 */}
              <div className="flex items-center gap-200">
                <ProfileAvatar size={24} seed={MOCK_POST.author.seed} />
                <span className="typo-caption1 text-text-caption">{MOCK_POST.author.nickname}</span>
                <span className="typo-caption2 ml-auto text-text-disabled">
                  {MOCK_POST.timeAgo}
                </span>
              </div>
            </div>
          </Card>

          {/* Card 2 - 본문 + 모집 태그 */}
          <Card className="gap-600 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
            <p className="typo-body2 whitespace-pre-wrap text-text-normal">
              {MOCK_POST.description}
            </p>
            <div className="flex flex-wrap gap-[6px]">
              {MOCK_POST.recruitTags.map((tag) => (
                <Tag key={tag} color="default">
                  {tag}
                </Tag>
              ))}
            </div>
          </Card>

          {/* Card 3 - 태그 섹션 */}
          <Card className="gap-500 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
            <h3 className="typo-title1 text-text-strong">태그</h3>

            {/* 중요하게 생각하는 점 */}
            <div className="flex flex-col gap-[10px]">
              <span className="typo-title2 text-text-strong">이런 점을 중요하게 생각해요</span>
              <div className="flex flex-wrap gap-[4px]">
                {MOCK_POST.importanceTags.map((tag) => (
                  <Tag key={tag} color="black">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>

            {/* 구분선 */}
            <Separator />

            {/* 공동 생활습관 */}
            <HabitList habits={MOCK_POST.habits} />
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

            <RoommateList members={MOCK_POST.members} />
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
            <BookmarkFilledIcon className="size-[30px]" />
          ) : (
            <BookmarkIcon className="size-[30px]" />
          )}
        </button>
        <MatchAlertDialog
          matchRate={MOCK_POST.matchRate}
          matchDetails={MOCK_POST.matchDetails}
          onConfirm={() => navigate("/chat")}
        >
          <Button className="flex-1" variant="ghost">
            매칭하기
          </Button>
        </MatchAlertDialog>

        <MatchAlertDialog
          matchRate={MOCK_POST.matchRate}
          matchDetails={MOCK_POST.matchDetails}
          onConfirm={() => navigate("/chat")}
        >
          <Button className="flex-1">채팅하기</Button>
        </MatchAlertDialog>
      </div>

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogIcon />
            <AlertDialogTitle icon>정말 삭제하시겠어요?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { PostDetailContent };

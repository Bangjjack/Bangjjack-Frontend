import { useNavigate } from "react-router";

import { BookmarkFilledIcon, BookmarkIcon } from "@/assets/icons";
import { Button } from "@/components/ui";
import { useBookmarkToggle } from "@/features/board/hooks";
import { MatchActionBar } from "@/features/board/components/roommate";

interface PostDetailBottomBarProps {
  postId: number;
  isOwner: boolean;
  matchRate?: number;
  matchHighlights?: string[];
}

function PostDetailBottomBar({
  postId,
  isOwner,
  matchRate = 0,
  matchHighlights = [],
}: PostDetailBottomBarProps) {
  const navigate = useNavigate();
  const { isBookmarked, toggle } = useBookmarkToggle(postId);

  const bookmarkButton = (
    <button
      type="button"
      aria-label={isBookmarked ? "북마크 해제" : "북마크"}
      className="flex size-[30px] shrink-0 items-center justify-center"
      onClick={toggle}
    >
      {isBookmarked ? (
        <BookmarkFilledIcon className="size-[30px] text-brand-primary" />
      ) : (
        <BookmarkIcon className="size-[30px]" />
      )}
    </button>
  );

  if (isOwner) {
    return (
      <div className="absolute inset-x-0 bottom-0 z-40 flex items-center gap-[10px] bg-bg-primary px-400 pb-9 pt-300">
        <Button className="flex-1" onClick={() => navigate("/chat")}>
          채팅 확인하기
        </Button>
      </div>
    );
  }

  return (
    <MatchActionBar
      leadingElement={bookmarkButton}
      matchRate={matchRate}
      matchHighlights={matchHighlights}
      onMatchConfirm={() => navigate(`/posts/${postId}/matching-report`)}
      onChatConfirm={() => navigate("/chat")}
    />
  );
}

export { PostDetailBottomBar };

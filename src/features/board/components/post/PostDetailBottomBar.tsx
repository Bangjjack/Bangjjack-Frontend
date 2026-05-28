import { useNavigate } from "react-router";

import { BookmarkFilledIcon, BookmarkIcon } from "@/assets/icons";
import { Button } from "@/components/ui";
import { MatchActionBar } from "@/features/board/components/roommate";
import { useBookmarkToggle } from "@/features/board/hooks";

interface PostDetailBottomBarProps {
  isOwner: boolean;
  matchHighlights?: string[];
  matchRate?: number;
  postId: number;
  targetProfileImage?: string | null;
  targetUserId: number;
  targetUsername: string;
}

function PostDetailBottomBar({
  isOwner,
  matchHighlights = [],
  matchRate = 0,
  postId,
  targetProfileImage,
  targetUserId,
  targetUsername,
}: PostDetailBottomBarProps) {
  const navigate = useNavigate();
  const { isBookmarked, toggle } = useBookmarkToggle(postId);

  const bookmarkButton = (
    <button
      aria-label={isBookmarked ? "북마크 해제" : "북마크"}
      className="flex size-[30px] shrink-0 items-center justify-center"
      onClick={toggle}
      type="button"
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
      matchHighlights={matchHighlights}
      matchRate={matchRate}
      onMatchConfirm={() =>
        navigate(`/posts/${postId}/matching-report`, {
          state: { targetUserId, targetUsername, targetProfileImage },
        })
      }
      postId={postId}
      targetProfileImage={targetProfileImage}
      targetUserId={targetUserId}
      targetUsername={targetUsername}
    />
  );
}

export { PostDetailBottomBar };

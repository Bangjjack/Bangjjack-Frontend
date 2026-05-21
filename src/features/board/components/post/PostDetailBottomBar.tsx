import { useNavigate } from "react-router";

import { BookmarkFilledIcon, BookmarkIcon } from "@/assets/icons";
import { Button } from "@/components/ui";
import { useBookmarkToggle } from "@/features/board/hooks";
import { MatchAlertDialog } from "@/features/board/components/roommate";

interface PostDetailBottomBarProps {
  postId: number;
  isOwner: boolean;
}

function PostDetailBottomBar({ postId, isOwner }: PostDetailBottomBarProps) {
  const navigate = useNavigate();
  const { isBookmarked, toggle } = useBookmarkToggle(postId);

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 flex items-center gap-[10px] bg-bg-primary px-400 pb-9 pt-300">
      {!isOwner && (
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
      )}

      {isOwner ? (
        <Button className="flex-1" onClick={() => navigate("/chat")}>
          채팅 확인하기
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
  );
}

export { PostDetailBottomBar };

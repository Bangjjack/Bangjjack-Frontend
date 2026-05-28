import { useNavigate } from "react-router";

import { BookmarkFilledIcon, BookmarkIcon } from "@/assets/icons";
import { Button, toast } from "@/components/ui";
import { MatchActionBar } from "@/features/board/components/roommate";
import { useBookmarkToggle } from "@/features/board/hooks";
import { useCreateChatRoom, type ChatDetail } from "@/features/chat";
import { parseDisplayName } from "@/lib/parseDisplayName";

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
  const { isPending: isCreatingChatRoom, mutate: createChatRoom } = useCreateChatRoom();

  const handleChatConfirm = () => {
    createChatRoom(
      { targetUserId },
      {
        onError: () => {
          toast.error("채팅방을 생성하지 못했어요.");
        },
        onSuccess: (chatRoom) => {
          const chatDetail: ChatDetail = {
            dateLabel: "",
            id: targetUserId,
            matchRate,
            messages: [],
            nickname: parseDisplayName(targetUsername),
            profileImage: targetProfileImage,
            profileSummary: matchHighlights,
            recruitPostId: postId,
            startSource: "recruit_post",
          };

          navigate(`/chat/${chatRoom.roomId}`, {
            state: {
              chatDetail,
              chatRoom,
            },
          });
        },
      },
    );
  };

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
      disabledMessage={isCreatingChatRoom ? "채팅방 생성 중..." : undefined}
      leadingElement={bookmarkButton}
      matchHighlights={matchHighlights}
      matchRate={matchRate}
      onChatConfirm={handleChatConfirm}
      onMatchConfirm={() => navigate(`/posts/${postId}/matching-report`)}
      postId={postId}
    />
  );
}

export { PostDetailBottomBar };

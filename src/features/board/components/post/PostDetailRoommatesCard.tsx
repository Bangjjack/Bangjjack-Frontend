import { useNavigate } from "react-router";

import { Card } from "@/components/ui";
import { RoommateList } from "@/features/board/components/roommate";
import type { PostAuthor } from "@/features/board/types";

interface PostDetailRoommatesCardProps {
  postId: number;
  author: PostAuthor;
}

function PostDetailRoommatesCard({ postId, author }: PostDetailRoommatesCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="gap-400 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
      <button
        type="button"
        className="flex cursor-pointer flex-col gap-100 text-left"
        onClick={() => navigate(`/board/${postId}/roommates`)}
      >
        <h3 className="typo-title1 text-text-strong">룸메이트 목록</h3>
        <span className="typo-caption2 text-text-caption">
          프로필을 선택하면 체크리스트를 확인할 수 있어요
        </span>
      </button>

      <RoommateList
        members={[{ nickname: author.username, seed: author.authorId, isHost: true }]}
      />
    </Card>
  );
}

export { PostDetailRoommatesCard };

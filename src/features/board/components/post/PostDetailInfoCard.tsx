import { Card, ProfileAvatar, Tag } from "@/components/ui";
import { formatRelativeTime } from "@/features/board/utils";
import type { PostAuthor } from "@/features/board/types";

interface PostDetailInfoCardProps {
  title: string;
  isClosed: boolean;
  currentMembers: number;
  maxMembers: number;
  author: PostAuthor;
  createdAt: string;
}

function PostDetailInfoCard({
  title,
  isClosed,
  currentMembers,
  maxMembers,
  author,
  createdAt,
}: PostDetailInfoCardProps) {
  return (
    <Card className="gap-0 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
      <div className="flex flex-col gap-300">
        <div className="flex items-center justify-between">
          <h2 className="typo-h4 text-text-strong">{title}</h2>
          <Tag color={isClosed ? "disabled" : "black"}>
            {isClosed ? "마감" : `${currentMembers} / ${maxMembers}`}
          </Tag>
        </div>

        <div className="flex items-center gap-200">
          <ProfileAvatar size={24} seed={author.authorId} />
          <span className="typo-caption1 text-text-caption">{author.username}</span>
          <span className="typo-caption2 ml-auto text-text-disabled">
            {formatRelativeTime(createdAt)}
          </span>
        </div>
      </div>
    </Card>
  );
}

export { PostDetailInfoCard };

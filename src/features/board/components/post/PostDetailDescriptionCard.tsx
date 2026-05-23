import { Card, Tag } from "@/components/ui";

interface PostDetailDescriptionCardProps {
  description: string;
  recruitTags: string[];
}

function PostDetailDescriptionCard({ description, recruitTags }: PostDetailDescriptionCardProps) {
  return (
    <Card className="gap-600 rounded-medium border-0 bg-bg-secondary px-450 py-600 shadow-none">
      <p className="typo-body2 whitespace-pre-wrap text-text-normal">{description}</p>
      <div className="flex flex-wrap gap-[6px]">
        {recruitTags.map((tag) => (
          <Tag key={tag} color="default">
            {tag}
          </Tag>
        ))}
      </div>
    </Card>
  );
}

export { PostDetailDescriptionCard };

import type { ReactNode } from "react";

import { Card, Tag } from "@/components/ui";

type AiCommentCardProps = {
  children: ReactNode;
};

function AiCommentCard({ children }: AiCommentCardProps) {
  return (
    <Card className="gap-400 rounded-medium border-brand-primary bg-brand-primary-light p-450 shadow-none">
      <div className="flex items-center gap-[6px]">
        <Tag color="orange">AI</Tag>
        <h3 className="typo-title2 text-text-strong">종합 코멘트</h3>
      </div>

      <div className="px-100">{children}</div>
    </Card>
  );
}

export { AiCommentCard };
export type { AiCommentCardProps };

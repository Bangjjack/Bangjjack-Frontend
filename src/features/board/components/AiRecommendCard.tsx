import { Button, Card } from "@/components/ui";
import { ChevronRightIcon } from "@/assets/icons";

type AiRecommendCardProps = {
  onClick?: () => void;
};

function AiRecommendCard({ onClick }: AiRecommendCardProps) {
  return (
    <Card className="w-full gap-0 rounded-medium border-0 bg-bg-secondary px-400 py-450 shadow-none">
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col">
          <button
            type="button"
            className="flex cursor-pointer items-center justify-between"
            onClick={onClick}
          >
            <h3 className="typo-title2 text-text-strong">AI 추천 룸메이트</h3>
            <ChevronRightIcon className="size-600 shrink-0 text-text-strong" aria-hidden="true" />
          </button>
          <p className="typo-caption1 text-text-caption">나에게 맞는 룸메이트를 찾아볼 수 있어요</p>
        </div>
        <Button size="sm" onClick={onClick}>
          AI 추천 보기
        </Button>
      </div>
    </Card>
  );
}

export { AiRecommendCard };

import type { MatchRateConversationStarter } from "@/features/board/types";

type SharedLifeTopicRowProps = Omit<MatchRateConversationStarter, "key">;

function SharedLifeTopicRow({ starter, subtitle }: SharedLifeTopicRowProps) {
  return (
    <div className="flex items-center gap-2.5 rounded-medium bg-neutral-100 p-300">
      <div className="flex min-w-0 flex-col gap-100">
        <p className="truncate typo-caption2 text-text-caption">{starter}</p>
        <p className="truncate typo-title3 leading-5 text-text-strong">{subtitle}</p>
      </div>
    </div>
  );
}

export { SharedLifeTopicRow };

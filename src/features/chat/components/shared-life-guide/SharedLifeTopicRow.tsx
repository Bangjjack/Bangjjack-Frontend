import type { ConversationTopic } from "@/features/chat/constants";

type SharedLifeTopicRowProps = ConversationTopic & {
  index: number;
};

function SharedLifeTopicRow({ index, prompt, title }: SharedLifeTopicRowProps) {
  return (
    <div className="flex items-center gap-2.5 rounded-medium bg-neutral-100 p-300">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-primary typo-label1 text-text-on-primary">
        {index + 1}
      </span>
      <div className="flex min-w-0 flex-col gap-100">
        <p className="truncate typo-caption2 text-text-caption">{prompt}</p>
        <p className="truncate typo-title3 leading-5 text-text-strong">{title}</p>
      </div>
    </div>
  );
}

export { SharedLifeTopicRow };

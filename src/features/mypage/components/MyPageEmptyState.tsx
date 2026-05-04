interface MyPageEmptyStateProps {
  messages: readonly string[];
}

function MyPageEmptyState({ messages }: MyPageEmptyStateProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center p-2.5">
      <div className="flex w-full flex-col items-center justify-center rounded-2xl p-400">
        <p className="typo-caption1 whitespace-pre-line text-center text-text-disabled">
          {messages.join("\n")}
        </p>
      </div>
    </div>
  );
}

export { MyPageEmptyState };
export type { MyPageEmptyStateProps };

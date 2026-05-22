export interface ChatDateBadgeProps {
  label: string;
}

function ChatDateBadge({ label }: ChatDateBadgeProps) {
  return (
    <div className="relative flex w-full items-center justify-center py-100">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border-normal" />
      <span className="relative bg-bg-primary px-[5px] text-center text-[10px] font-medium leading-[14px] tracking-[-0.005em] text-text-disabled">
        {label}
      </span>
    </div>
  );
}

export { ChatDateBadge };

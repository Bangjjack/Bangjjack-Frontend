export interface ChatDateBadgeProps {
  label: string;
}

function ChatDateBadge({ label }: ChatDateBadgeProps) {
  return (
    <span className="rounded-large bg-text-label px-200 py-100 text-center text-[10px] font-medium leading-3 tracking-[-0.005px] text-text-on-primary">
      {label}
    </span>
  );
}

export { ChatDateBadge };

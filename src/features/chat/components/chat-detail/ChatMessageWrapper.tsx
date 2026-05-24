import type { ReactNode } from "react";

import { ChatDateBadge } from "@/features/chat/components/chat-detail/ChatDateBadge";
import { cn } from "@/lib/cn";

type ChatMessageWrapperProps = {
  children: ReactNode;
  compactSpacing?: boolean;
  dateBadgeLabel?: string | null;
  isFirst?: boolean;
};

export function ChatMessageWrapper({
  children,
  compactSpacing = false,
  dateBadgeLabel,
  isFirst = false,
}: ChatMessageWrapperProps) {
  return (
    <div
      className={cn("flex flex-col gap-400", !isFirst && (compactSpacing ? "mt-200" : "mt-400"))}
    >
      {dateBadgeLabel ? <ChatDateBadge label={dateBadgeLabel} /> : null}
      {children}
    </div>
  );
}

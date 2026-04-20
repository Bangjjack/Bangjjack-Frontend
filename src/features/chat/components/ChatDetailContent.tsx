import { useState } from "react";

import { ProfileOrangeIcon } from "@/assets/icons";
import { Header, type HeaderProps } from "@/components/ui";
import { ChatDateBadge } from "@/features/chat/components/ChatDateBadge";
import { ChatInputBar } from "@/features/chat/components/ChatInputBar";
import { ChatMatchCard } from "@/features/chat/components/ChatMatchCard";
import type { ChatDetail } from "@/features/chat/types";
import { cn } from "@/lib/cn";

export type ChatDetailContentProps = {
  chatDetail: ChatDetail;
  className?: string;
  onBack: () => void;
};

function ChatDetailContent({ chatDetail, className, onBack }: ChatDetailContentProps) {
  const headerProps: Pick<HeaderProps, "onBackClick" | "showBack" | "showProfile" | "title"> = {
    onBackClick: onBack,
    showBack: true,
    showProfile: true,
    title: chatDetail.nickname,
  };
  const [draftMessage, setDraftMessage] = useState("");
  const [messages, setMessages] = useState(chatDetail.messages);

  const handleSubmitMessage = () => {
    const nextMessage = draftMessage.trim();

    if (!nextMessage) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sentAt: new Intl.DateTimeFormat("ko-KR", {
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date()),
        text: nextMessage,
        type: "outgoing",
      },
    ]);
    setDraftMessage("");
  };

  return (
    <div className={cn("flex min-h-dvh flex-col bg-bg-primary", className)}>
      <Header {...headerProps} />

      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto px-400 pb-400">
        <div className="flex flex-col gap-400 pb-400 pt-100">
          <div className="flex justify-center">
            <ChatDateBadge label={chatDetail.dateLabel} />
          </div>

          <ChatMatchCard
            matchRate={chatDetail.matchRate}
            profileSummary={chatDetail.profileSummary}
          />

          <div className="flex flex-col gap-400">
            {messages.map((message) => {
              const isOutgoing = message.type === "outgoing";

              return (
                <div
                  key={message.id}
                  className={cn("flex w-full items-end gap-200", isOutgoing && "justify-end")}
                >
                  {!isOutgoing ? <ProfileOrangeIcon className="size-9 shrink-0 self-end" /> : null}

                  {!isOutgoing ? (
                    <div className="max-w-55 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-bg-secondary px-300 py-300">
                      <p className="typo-caption2 tracking-[-0.03125rem] text-text-alternative">
                        {message.text}
                      </p>
                    </div>
                  ) : null}

                  <span className="typo-caption4 text-text-disabled">{message.sentAt}</span>

                  {isOutgoing ? (
                    <div className="max-w-55 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-brand-primary px-300 py-300">
                      <p className="typo-caption2 tracking-[-0.03125rem] text-text-on-primary">
                        {message.text}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ChatInputBar
        onChange={setDraftMessage}
        onSubmit={handleSubmitMessage}
        value={draftMessage}
      />
    </div>
  );
}

export { ChatDetailContent };

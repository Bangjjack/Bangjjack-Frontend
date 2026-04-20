import { useState } from "react";

import { ProfileOrangeIcon } from "@/assets/icons";
import { Header, type HeaderProps } from "@/components/ui";
import { ChatDateBadge } from "@/features/chat/components/ChatDateBadge";
import { ChatInputBar } from "@/features/chat/components/ChatInputBar";
import { ChatInputMenu } from "@/features/chat/components/ChatInputMenu";
import { ChatMatchCard } from "@/features/chat/components/ChatMatchCard";
import { ChatRecruitCard } from "@/features/chat/components/ChatRecruitCard";
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
  const [inputMenuOpen, setInputMenuOpen] = useState(false);
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
    setInputMenuOpen(false);
  };

  return (
    <div className={cn("relative flex min-h-dvh flex-col bg-bg-primary", className)}>
      <Header {...headerProps} />

      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto px-400 pb-400">
        <div className="flex flex-col gap-400 pb-400 pt-100">
          <div className="flex justify-center">
            <ChatDateBadge label={chatDetail.dateLabel} />
          </div>

          {chatDetail.startSource === "ai_recommendation" ? (
            <ChatMatchCard
              matchRate={chatDetail.matchRate}
              profileSummary={chatDetail.profileSummary}
            />
          ) : (
            <ChatRecruitCard
              matchRate={chatDetail.matchRate}
              profileSummary={chatDetail.profileSummary}
              recruitTitle={chatDetail.recruitTitle ?? "모집글"}
            />
          )}

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

      <div className="relative z-10">
        {inputMenuOpen ? (
          <>
            <button
              aria-label="입력 메뉴 닫기"
              className="fixed inset-0 z-0 cursor-default"
              onClick={() => {
                setInputMenuOpen(false);
              }}
              type="button"
            />

            <div className="pointer-events-none absolute inset-x-400 bottom-full z-10 mb-200">
              <ChatInputMenu
                className="pointer-events-auto"
                onActionClick={() => {
                  setInputMenuOpen(false);
                }}
              />
            </div>
          </>
        ) : null}

        <ChatInputBar
          isMenuOpen={inputMenuOpen}
          onChange={setDraftMessage}
          onPlusClick={() => {
            setInputMenuOpen((prev) => !prev);
          }}
          onSubmit={handleSubmitMessage}
          value={draftMessage}
        />
      </div>
    </div>
  );
}

export { ChatDetailContent };

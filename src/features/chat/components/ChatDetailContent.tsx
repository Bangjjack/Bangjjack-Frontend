import { ProfileOrangeIcon } from "@/assets/icons";
import { Header, type HeaderProps } from "@/components/ui";
import { ChatDateBadge } from "@/features/chat/components/ChatDateBadge";
import { ChatInputBar } from "@/features/chat/components/ChatInputBar";
import { ChatInputMenu } from "@/features/chat/components/ChatInputMenu";
import { ChatMatchCard } from "@/features/chat/components/ChatMatchCard";
import { ChatRecruitCard } from "@/features/chat/components/ChatRecruitCard";
import { ChatRoommateInviteMessage } from "@/features/chat/components/ChatRoommateInviteMessage";
import { ChatRoommateInviteSheet } from "@/features/chat/components/ChatRoommateInviteSheet";
import { ChatRoommateRequestMessage } from "@/features/chat/components/ChatRoommateRequestMessage";
import { useChatComposer } from "@/features/chat/hooks/useChatComposer";
import type { ChatDetail } from "@/features/chat/types";
import { cn } from "@/lib/cn";

export interface ChatDetailContentProps {
  chatDetail: ChatDetail;
  className?: string;
  onBack: () => void;
  onRoommateRequestAccept?: () => void;
  onProfileClick?: () => void;
}

function ChatDetailContent({
  chatDetail,
  className,
  onBack,
  onRoommateRequestAccept,
  onProfileClick,
}: ChatDetailContentProps) {
  const headerProps: Pick<HeaderProps, "onBackClick" | "showBack" | "showProfile" | "title"> = {
    onBackClick: onBack,
    showBack: true,
    showProfile: true,
    title: chatDetail.nickname,
  };

  const {
    closeInputMenu,
    closeInviteSheet,
    completeInputMenuClose,
    draftMessage,
    handleCancelInviteRequest,
    handleInputMenuAction,
    handleSendInviteRequest,
    handleSubmitMessage,
    inputMenuClosing,
    inputMenuOpen,
    inviteSheetOpen,
    messages,
    setDraftMessage,
    toggleInputMenu,
  } = useChatComposer({ chatDetail });

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
              onProfileClick={onProfileClick}
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
              if (message.type === "roommate_request") {
                return (
                  <div key={message.id} className="flex w-full items-end gap-200">
                    <ProfileOrangeIcon className="size-9 shrink-0 self-end" />
                    <ChatRoommateRequestMessage
                      onAccept={onRoommateRequestAccept}
                      requesterName={message.requesterName}
                    />
                    {message.sentAt ? (
                      <span className="shrink-0 whitespace-nowrap text-[8px] font-medium leading-3.5 tracking-[-0.005em] text-text-disabled">
                        {message.sentAt}
                      </span>
                    ) : null}
                  </div>
                );
              }

              if (message.type === "roommate_invite") {
                return (
                  <div key={message.id} className="flex w-full justify-end">
                    <ChatRoommateInviteMessage
                      onCancel={() => handleCancelInviteRequest(message.id)}
                      recipientName={message.recipientName}
                    />
                  </div>
                );
              }

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
              className="fixed inset-0 z-10"
              onClick={closeInputMenu}
              type="button"
            />

            <div className="pointer-events-none absolute inset-x-400 bottom-full z-20 mb-200">
              <ChatInputMenu
                className="pointer-events-auto"
                isClosing={inputMenuClosing}
                onActionClick={handleInputMenuAction}
                onAnimationEnd={(event) => {
                  if (event.currentTarget !== event.target || !inputMenuClosing) {
                    return;
                  }

                  completeInputMenuClose();
                }}
              />
            </div>
          </>
        ) : null}

        <ChatInputBar
          isMenuOpen={inputMenuOpen}
          onChange={setDraftMessage}
          onPlusClick={toggleInputMenu}
          onSubmit={handleSubmitMessage}
          value={draftMessage}
        />
      </div>

      {inviteSheetOpen ? (
        <ChatRoommateInviteSheet
          age={chatDetail.age}
          department={chatDetail.department}
          lifestyleTags={chatDetail.lifestyleTags ?? chatDetail.profileSummary}
          nickname={chatDetail.nickname}
          onCancel={closeInviteSheet}
          onConfirm={handleSendInviteRequest}
        />
      ) : null}
    </div>
  );
}

export { ChatDetailContent };

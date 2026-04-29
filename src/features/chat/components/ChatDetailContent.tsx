import { ChatInputBar, Header, ProfileAvatar, type HeaderProps } from "@/components/ui";
import {
  ChatDateBadge,
  ChatInputMenu,
  ChatMatchCard,
  ChatRoommateInviteMessage,
  ChatRoommateInviteSheet,
  ChatRoommateRequestMessage,
} from "@/features/chat/components";
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
  const headerProps: Pick<
    HeaderProps,
    "onBackClick" | "onProfileClick" | "profileElement" | "showBack" | "showProfile" | "title"
  > = {
    onBackClick: onBack,
    onProfileClick,
    profileElement: <ProfileAvatar seed={chatDetail.id} size={36} />,
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

  const recruitTitle =
    chatDetail.startSource === "recruit_post" ? (chatDetail.recruitTitle ?? "모집글") : undefined;

  return (
    <div className={cn("relative flex h-dvh overflow-hidden flex-col bg-bg-primary", className)}>
      <Header {...headerProps} />

      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="flex flex-col gap-400 px-400 py-[8px]">
          <ChatMatchCard
            className="sticky top-200 z-10 shrink-0"
            matchRate={chatDetail.matchRate}
            onProfileClick={onProfileClick}
            profileSummary={chatDetail.profileSummary}
            recruitTitle={recruitTitle}
          />

          <div className="flex justify-center">
            <ChatDateBadge label={chatDetail.dateLabel} />
          </div>

          <div className="flex flex-col gap-400">
            {messages.map((message) => {
              if (message.type === "roommate_request") {
                return (
                  <div key={message.id} className="flex w-full items-end gap-200">
                    <ProfileAvatar className="shrink-0 self-end" seed={chatDetail.id} size={36} />
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
                  {!isOutgoing ? (
                    <ProfileAvatar className="shrink-0 self-end" seed={chatDetail.id} size={36} />
                  ) : null}

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
          avatarSeed={chatDetail.id}
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

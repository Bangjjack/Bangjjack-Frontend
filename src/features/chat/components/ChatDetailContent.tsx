import { useEffect, useRef, type ReactNode } from "react";

import { ChatInputBar, Header, ProfileAvatar, type HeaderProps } from "@/components/ui";
import {
  ChatDateBadge,
  ChatInputMenu,
  ChatMatchCard,
  ChatRoommateInviteMessage,
  ChatRoommateInviteSheet,
  ChatRoommateRequestMessage,
} from "@/features/chat/components";
import { useChatComposer } from "@/features/chat/hooks";
import type { ChatDetail, ChatMessage, ChatTextMessage } from "@/features/chat/types";
import { cn } from "@/lib/cn";

export interface ChatDetailContentProps {
  chatDetail: ChatDetail;
  className?: string;
  currentUserId?: number | null;
  hasPreviousMessages?: boolean;
  initialMessages?: ChatMessage[];
  isLoadingPreviousMessages?: boolean;
  roomId?: number;
  onBack: () => void;
  onLoadPreviousMessages?: () => void | Promise<unknown>;
  onRoommateRequestAccept?: () => void;
  onProfileClick?: () => void;
  onRecruitClick?: () => void;
}

function getMessageDateBadgeLabels(messages: ChatMessage[], fallbackDateLabel: string) {
  let previousDateKey: string | undefined;

  return messages.map((message) => {
    const isTextMessage = message.type === "outgoing" || message.type === "incoming";
    const messageDateKey = isTextMessage
      ? (message.dateKey ?? fallbackDateLabel)
      : fallbackDateLabel;
    const messageDateLabel = isTextMessage
      ? (message.dateLabel ?? fallbackDateLabel)
      : fallbackDateLabel;

    if (messageDateKey === previousDateKey) {
      return null;
    }

    previousDateKey = messageDateKey;
    return messageDateLabel;
  });
}

function isTextMessage(message: ChatMessage): message is ChatTextMessage {
  return message.type === "outgoing" || message.type === "incoming";
}

function shouldShowMessageTime(messages: ChatMessage[], index: number) {
  const message = messages[index];
  const nextMessage = messages[index + 1];

  if (!message || !isTextMessage(message)) {
    return false;
  }

  if (!nextMessage || !isTextMessage(nextMessage)) {
    return true;
  }

  return !isSameMessageTimeGroup(message, nextMessage);
}

function isSameMessageTimeGroup(message: ChatTextMessage, otherMessage: ChatTextMessage) {
  const messageDateKey = message.dateKey ?? message.dateLabel ?? "";
  const otherMessageDateKey = otherMessage.dateKey ?? otherMessage.dateLabel ?? "";

  return (
    message.type === otherMessage.type &&
    message.sentAt === otherMessage.sentAt &&
    messageDateKey === otherMessageDateKey
  );
}

function isSameMessageTimeGroupWithPrevious(messages: ChatMessage[], index: number) {
  const message = messages[index];
  const previousMessage = messages[index - 1];

  if (!message || !previousMessage || !isTextMessage(message) || !isTextMessage(previousMessage)) {
    return false;
  }

  return isSameMessageTimeGroup(previousMessage, message);
}

function ChatMessageWrapper({
  children,
  compactSpacing = false,
  dateBadgeLabel,
  isFirst = false,
}: {
  children: ReactNode;
  compactSpacing?: boolean;
  dateBadgeLabel?: string | null;
  isFirst?: boolean;
}) {
  return (
    <div
      className={cn("flex flex-col gap-400", !isFirst && (compactSpacing ? "mt-200" : "mt-400"))}
    >
      {dateBadgeLabel ? <ChatDateBadge label={dateBadgeLabel} /> : null}
      {children}
    </div>
  );
}

function ChatDetailContent({
  chatDetail,
  className,
  currentUserId,
  hasPreviousMessages = false,
  initialMessages,
  isLoadingPreviousMessages = false,
  roomId,
  onBack,
  onLoadPreviousMessages,
  onRoommateRequestAccept,
  onProfileClick,
  onRecruitClick,
}: ChatDetailContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const previousScrollHeightRef = useRef(0);
  const shouldRestoreScrollPositionRef = useRef(false);
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
  } = useChatComposer({ chatDetail, currentUserId, initialMessages, roomId });

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    if (shouldRestoreScrollPositionRef.current) {
      shouldRestoreScrollPositionRef.current = false;
      scrollContainer.scrollTop = scrollContainer.scrollHeight - previousScrollHeightRef.current;
      return;
    }

    scrollContainer.scrollTo({
      behavior: "smooth",
      top: scrollContainer.scrollHeight,
    });
  }, [messages.length]);

  const handleMessagesScroll = () => {
    const scrollContainer = scrollContainerRef.current;

    if (
      !scrollContainer ||
      !hasPreviousMessages ||
      isLoadingPreviousMessages ||
      scrollContainer.scrollTop > 24
    ) {
      return;
    }

    previousScrollHeightRef.current = scrollContainer.scrollHeight;
    shouldRestoreScrollPositionRef.current = true;
    void onLoadPreviousMessages?.();
  };

  const recruitTitle =
    chatDetail.startSource === "recruit_post" ? (chatDetail.recruitTitle ?? "모집글") : undefined;
  const dateBadgeLabels = getMessageDateBadgeLabels(messages, chatDetail.dateLabel);

  return (
    <div className={cn("relative flex h-dvh overflow-hidden flex-col bg-bg-primary", className)}>
      <Header {...headerProps} />

      <div
        ref={scrollContainerRef}
        className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto"
        onScroll={handleMessagesScroll}
      >
        <div className="flex flex-col gap-400 px-400 py-200">
          <ChatMatchCard
            className="sticky top-200 z-10 shrink-0"
            matchRate={chatDetail.matchRate}
            onProfileClick={onProfileClick}
            onRecruitClick={onRecruitClick}
            profileSummary={chatDetail.profileSummary}
            recruitTitle={recruitTitle}
          />

          <div className="flex flex-col">
            {messages.map((message, index) => {
              const dateBadgeLabel = dateBadgeLabels[index];
              const compactSpacing = isSameMessageTimeGroupWithPrevious(messages, index);

              if (message.type === "roommate_request") {
                return (
                  <ChatMessageWrapper
                    key={message.id}
                    dateBadgeLabel={dateBadgeLabel}
                    isFirst={index === 0}
                  >
                    <div className="flex w-full items-end gap-200">
                      <ProfileAvatar className="shrink-0 self-end" seed={chatDetail.id} size={36} />
                      <ChatRoommateRequestMessage
                        onAccept={onRoommateRequestAccept}
                        requesterName={message.requesterName}
                      />
                      {message.sentAt ? (
                        <span className="shrink-0 whitespace-nowrap typo-caption4 text-text-disabled">
                          {message.sentAt}
                        </span>
                      ) : null}
                    </div>
                  </ChatMessageWrapper>
                );
              }

              if (message.type === "roommate_invite") {
                return (
                  <ChatMessageWrapper
                    key={message.id}
                    dateBadgeLabel={dateBadgeLabel}
                    isFirst={index === 0}
                  >
                    <div className="flex w-full justify-end">
                      <ChatRoommateInviteMessage
                        onCancel={() => handleCancelInviteRequest(message.id)}
                        recipientName={message.recipientName}
                      />
                    </div>
                  </ChatMessageWrapper>
                );
              }

              const isOutgoing = message.type === "outgoing";
              const showProfile = !isOutgoing && !compactSpacing;
              const showMessageTime = shouldShowMessageTime(messages, index);

              return (
                <ChatMessageWrapper
                  key={message.id}
                  compactSpacing={compactSpacing}
                  dateBadgeLabel={dateBadgeLabel}
                  isFirst={index === 0}
                >
                  <div className={cn("flex w-full items-end gap-200", isOutgoing && "justify-end")}>
                    {!isOutgoing ? (
                      <ProfileAvatar
                        className={cn("shrink-0 self-end", !showProfile && "invisible")}
                        seed={chatDetail.id}
                        size={36}
                      />
                    ) : null}

                    {!isOutgoing ? (
                      <div className="max-w-55 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-bg-secondary px-300 py-300">
                        <p className="whitespace-pre-wrap break-words typo-caption2 text-text-alternative">
                          {message.text}
                        </p>
                      </div>
                    ) : null}

                    {showMessageTime ? (
                      <span className="typo-caption4 text-text-disabled">{message.sentAt}</span>
                    ) : null}

                    {isOutgoing ? (
                      <div className="max-w-55 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-brand-primary px-300 py-300">
                        <p className="whitespace-pre-wrap break-words typo-caption2 text-text-on-primary">
                          {message.text}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </ChatMessageWrapper>
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

      <ChatRoommateInviteSheet
        age={chatDetail.age}
        avatarSeed={chatDetail.id}
        department={chatDetail.department}
        lifestyleTags={chatDetail.lifestyleTags ?? chatDetail.profileSummary}
        nickname={chatDetail.nickname}
        open={inviteSheetOpen}
        onCancel={closeInviteSheet}
        onConfirm={handleSendInviteRequest}
      />
    </div>
  );
}

export { ChatDetailContent };

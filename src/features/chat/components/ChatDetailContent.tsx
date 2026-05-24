import { ChatInputBar, Header, ProfileAvatar, type HeaderProps } from "@/components/ui";
import { ChatInputMenu, ChatRoommateInviteSheet } from "@/features/chat/components";
import { useChatComposer } from "@/features/chat/hooks";
import { ChatMessageListSection } from "@/features/chat/sections";
import type { ChatDetail, ChatMessage } from "@/features/chat/types";
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
  onProfileClick?: () => void;
  onRecruitClick?: () => void;
  onRoommateRequestAccept?: () => void;
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
  onProfileClick,
  onRecruitClick,
  onRoommateRequestAccept,
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
  } = useChatComposer({ chatDetail, currentUserId, initialMessages, roomId });

  return (
    <div className={cn("relative flex h-dvh overflow-hidden flex-col bg-bg-primary", className)}>
      <Header {...headerProps} />

      <ChatMessageListSection
        chatDetail={chatDetail}
        hasPreviousMessages={hasPreviousMessages}
        isLoadingPreviousMessages={isLoadingPreviousMessages}
        messages={messages}
        onCancelInviteRequest={handleCancelInviteRequest}
        onLoadPreviousMessages={onLoadPreviousMessages}
        onProfileClick={onProfileClick}
        onRecruitClick={onRecruitClick}
        onRoommateRequestAccept={onRoommateRequestAccept}
      />

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

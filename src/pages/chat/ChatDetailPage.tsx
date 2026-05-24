import { Header, ProfileAvatar, type HeaderProps } from "@/components/ui";
import { type ChatDetailPageProps, useChatComposer, useChatDetailPage } from "@/features/chat";
import { ChatInputSection, ChatMessageListSection } from "@/features/chat/sections";
import { cn } from "@/lib/cn";

function ChatDetailPageContent({
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
}: ChatDetailPageProps) {
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

      <ChatInputSection
        chatDetail={chatDetail}
        draftMessage={draftMessage}
        inputMenuClosing={inputMenuClosing}
        inputMenuOpen={inputMenuOpen}
        inviteSheetOpen={inviteSheetOpen}
        onCloseInputMenu={closeInputMenu}
        onCloseInviteSheet={closeInviteSheet}
        onCompleteInputMenuClose={completeInputMenuClose}
        onInputMenuAction={handleInputMenuAction}
        onSendInviteRequest={handleSendInviteRequest}
        onSubmitMessage={handleSubmitMessage}
        onToggleInputMenu={toggleInputMenu}
        onUpdateDraftMessage={setDraftMessage}
      />
    </div>
  );
}

export default function ChatDetailPage() {
  const chatDetailPageProps = useChatDetailPage();

  if (!chatDetailPageProps) {
    return null;
  }

  return <ChatDetailPageContent key={chatDetailPageProps.chatDetail.id} {...chatDetailPageProps} />;
}

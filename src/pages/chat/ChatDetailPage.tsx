import { Header, ProfileAvatar, type HeaderProps } from "@/components/ui";
import { useChatComposer, useChatDetailPage } from "@/features/chat";
import { ChatInputSection, ChatMessageListSection } from "@/features/chat/sections";
import type { ChatDetail } from "@/features/chat/types";
import { cn } from "@/lib/cn";

const EMPTY_CHAT_DETAIL: ChatDetail = {
  dateLabel: "",
  id: 0,
  matchRate: 0,
  messages: [],
  nickname: "",
  profileSummary: [],
  startSource: "ai_recommendation",
};

export default function ChatDetailPage() {
  const { chatDetail, composer, messageList, navigation } = useChatDetailPage();
  const activeChatDetail = chatDetail ?? EMPTY_CHAT_DETAIL;

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
  } = useChatComposer({
    chatDetail: activeChatDetail,
    currentUserId: composer.currentUserId,
    initialMessages: composer.initialMessages,
    roomId: composer.roomId,
  });

  if (!chatDetail) {
    return null;
  }

  const headerProps: Pick<
    HeaderProps,
    "onBackClick" | "onProfileClick" | "profileElement" | "showBack" | "showProfile" | "title"
  > = {
    onBackClick: navigation.onBack,
    onProfileClick: navigation.onProfileClick,
    profileElement: (
      <ProfileAvatar imageUrl={chatDetail.profileImage} seed={chatDetail.id} size={36} />
    ),
    showBack: true,
    showProfile: true,
    title: chatDetail.nickname,
  };

  return (
    <div className={cn("relative flex h-dvh overflow-hidden flex-col bg-bg-primary")}>
      <Header {...headerProps} />

      <ChatMessageListSection
        chatDetail={chatDetail}
        hasPreviousMessages={messageList.hasPreviousMessages}
        isLoadingPreviousMessages={messageList.isLoadingPreviousMessages}
        messages={messages}
        onCancelInviteRequest={handleCancelInviteRequest}
        onLoadPreviousMessages={messageList.onLoadPreviousMessages}
        onProfileClick={navigation.onProfileClick}
        onRecruitClick={navigation.onRecruitClick}
        onReportClick={navigation.onReportClick}
        onRoommateRequestAccept={navigation.onRoommateRequestAccept}
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

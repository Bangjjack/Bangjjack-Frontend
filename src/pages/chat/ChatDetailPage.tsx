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
  const {
    chatDetail,
    composer,
    isLeavingChatRoom,
    isProcessingRoommateRequest,
    messageList,
    navigation,
  } = useChatDetailPage();
  const activeChatDetail = chatDetail ?? EMPTY_CHAT_DETAIL;

  const {
    closeInputMenu,
    closeInviteSheet,
    closeLeaveSheet,
    completeInputMenuClose,
    draftMessage,
    handleCancelInviteRequest,
    handleConfirmLeaveChatRoom,
    handleInputMenuAction,
    handleRoommateRequestAccept,
    handleSendInviteRequest,
    handleSubmitMessage,
    inputMenuClosing,
    inputMenuOpen,
    isSendingInviteRequest,
    inviteSheetOpen,
    leaveSheetOpen,
    messages,
    setDraftMessage,
    toggleInputMenu,
  } = useChatComposer({
    chatDetail: activeChatDetail,
    currentUserId: composer.currentUserId,
    initialMessages: composer.initialMessages,
    onLeaveChatRoom: navigation.onLeaveChatRoom,
    onRoommateRequestAccept: navigation.onRoommateRequestAccept,
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
        isProcessingRoommateRequest={isProcessingRoommateRequest}
        onRoommateRequestAccept={handleRoommateRequestAccept}
        onRoommateRequestReject={navigation.onRoommateRequestReject}
      />

      <ChatInputSection
        chatDetail={chatDetail}
        draftMessage={draftMessage}
        inputMenuClosing={inputMenuClosing}
        inputMenuOpen={inputMenuOpen}
        isLeavingChatRoom={isLeavingChatRoom}
        isSendingInviteRequest={isSendingInviteRequest}
        inviteSheetOpen={inviteSheetOpen}
        leaveSheetOpen={leaveSheetOpen}
        onCloseInputMenu={closeInputMenu}
        onCloseInviteSheet={closeInviteSheet}
        onCloseLeaveSheet={closeLeaveSheet}
        onCompleteInputMenuClose={completeInputMenuClose}
        onInputMenuAction={handleInputMenuAction}
        onLeaveChatRoom={handleConfirmLeaveChatRoom}
        onSendInviteRequest={handleSendInviteRequest}
        onSubmitMessage={handleSubmitMessage}
        onToggleInputMenu={toggleInputMenu}
        onUpdateDraftMessage={setDraftMessage}
      />
    </div>
  );
}

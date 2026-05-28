import { Header, ProfileAvatar, Skeleton, type HeaderProps } from "@/components/ui";
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
    partnerLastReadMessageId,
    setDraftMessage,
    toggleInputMenu,
  } = useChatComposer({
    chatDetail: activeChatDetail,
    currentUserId: composer.currentUserId,
    initialPartnerLastReadMessageId: composer.initialPartnerLastReadMessageId,
    initialMessages: composer.initialMessages,
    onLeaveChatRoom: navigation.onLeaveChatRoom,
    onRoommateRequestAccept: navigation.onRoommateRequestAccept,
    roomId: composer.roomId,
  });

  if (!chatDetail) {
    return (
      <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
        <div className="flex h-14 shrink-0 items-center gap-300 px-400">
          <Skeleton className="size-6 rounded" />
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="flex flex-1 flex-col gap-400 overflow-hidden px-400 py-200">
          <Skeleton className="h-10 w-48 self-start rounded-2xl" />
          <Skeleton className="h-10 w-40 self-end rounded-2xl" />
          <Skeleton className="h-10 w-56 self-start rounded-2xl" />
          <Skeleton className="h-10 w-32 self-end rounded-2xl" />
          <Skeleton className="h-10 w-44 self-start rounded-2xl" />
        </div>
        <div className="shrink-0 px-400 pb-6 pt-200">
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    );
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
        partnerLastReadMessageId={partnerLastReadMessageId}
        profileSummary={messageList.profileSummary}
        recruitTitle={messageList.recruitTitle}
      />

      <ChatInputSection
        chatDetail={chatDetail}
        composer={{
          draftMessage,
          onSubmitMessage: handleSubmitMessage,
          onToggleInputMenu: toggleInputMenu,
          onUpdateDraftMessage: setDraftMessage,
        }}
        inputMenu={{
          isClosing: inputMenuClosing,
          isOpen: inputMenuOpen,
          onAction: handleInputMenuAction,
          onClose: closeInputMenu,
          onCompleteClose: completeInputMenuClose,
        }}
        inviteSheet={{
          isSendingInviteRequest,
          onClose: closeInviteSheet,
          onSendInviteRequest: handleSendInviteRequest,
          open: inviteSheetOpen,
        }}
        leaveSheet={{
          isLeavingChatRoom,
          onClose: closeLeaveSheet,
          onLeaveChatRoom: handleConfirmLeaveChatRoom,
          open: leaveSheetOpen,
        }}
      />
    </div>
  );
}

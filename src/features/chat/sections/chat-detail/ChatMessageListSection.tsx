import { useEffect, useRef } from "react";

import { ChatMatchCard, ChatMessageList } from "@/features/chat/components";
import type { ChatDetail, ChatMessage } from "@/features/chat/types";

export type ChatMessageListSectionProps = {
  chatDetail: ChatDetail;
  hasPreviousMessages?: boolean;
  isCancelingInviteRequest?: boolean;
  isLoadingPreviousMessages?: boolean;
  isSendingResendRequest?: boolean;
  messages: ChatMessage[];
  onCancelInviteRequest: (messageId: number) => void;
  onLoadPreviousMessages?: () => void | Promise<unknown>;
  onProfileClick?: () => void;
  onRecruitClick?: () => void;
  onReportClick?: () => void;
  onResendInviteRequest?: () => void;
  onRoommateRequestAccept?: (applicationId?: number) => void;
  onRoommateRequestReject?: (applicationId?: number) => void;
  partnerLastReadMessageId?: number | null;
  profileSummary: string[];
  recruitTitle?: string;
  isProcessingRoommateRequest?: boolean;
};

function ChatMessageListSection({
  chatDetail,
  hasPreviousMessages = false,
  isCancelingInviteRequest,
  isLoadingPreviousMessages = false,
  isSendingResendRequest,
  messages,
  onCancelInviteRequest,
  onLoadPreviousMessages,
  onProfileClick,
  onRecruitClick,
  onReportClick,
  onResendInviteRequest,
  isProcessingRoommateRequest,
  onRoommateRequestAccept,
  onRoommateRequestReject,
  partnerLastReadMessageId,
  profileSummary,
  recruitTitle,
}: ChatMessageListSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const previousScrollHeightRef = useRef(0);
  const shouldRestoreScrollPositionRef = useRef(false);

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

  return (
    <section
      ref={scrollContainerRef}
      className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto"
      onScroll={handleMessagesScroll}
    >
      <div className="flex flex-col gap-400 px-400 py-200">
        {recruitTitle && (
          <ChatMatchCard
            className="sticky top-200 z-10 shrink-0"
            matchRate={chatDetail.matchRate}
            onProfileClick={onProfileClick}
            onRecruitClick={onRecruitClick}
            onReportClick={onReportClick}
            profileSummary={profileSummary}
            recruitTitle={recruitTitle}
          />
        )}

        <ChatMessageList
          avatarSeed={chatDetail.id}
          avatarImageUrl={chatDetail.profileImage}
          chatDetail={chatDetail}
          fallbackDateLabel={chatDetail.dateLabel}
          messages={messages}
          isCancelingInviteRequest={isCancelingInviteRequest}
          isSendingResendRequest={isSendingResendRequest}
          onCancelInviteRequest={onCancelInviteRequest}
          onResendInviteRequest={onResendInviteRequest}
          isProcessingRoommateRequest={isProcessingRoommateRequest}
          onRoommateRequestAccept={onRoommateRequestAccept}
          onRoommateRequestReject={onRoommateRequestReject}
          partnerLastReadMessageId={partnerLastReadMessageId}
        />
      </div>
    </section>
  );
}

export { ChatMessageListSection };

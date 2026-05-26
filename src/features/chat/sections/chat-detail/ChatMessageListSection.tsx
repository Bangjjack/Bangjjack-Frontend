import { useEffect, useRef } from "react";

import { DORMITORY_LABEL, ROOM_SIZE_LABEL, SEMESTER_LABEL } from "@/constants";
import { usePostDetail } from "@/features/board/hooks";
import { ChatMatchCard, ChatMessageList } from "@/features/chat/components";
import type { ChatDetail, ChatMessage } from "@/features/chat/types";

export type ChatMessageListSectionProps = {
  chatDetail: ChatDetail;
  hasPreviousMessages?: boolean;
  isLoadingPreviousMessages?: boolean;
  messages: ChatMessage[];
  onCancelInviteRequest: (messageId: number) => void;
  onLoadPreviousMessages?: () => void | Promise<unknown>;
  onProfileClick?: () => void;
  onRecruitClick?: () => void;
  onRoommateRequestAccept?: () => void;
};

function ChatMessageListSection({
  chatDetail,
  hasPreviousMessages = false,
  isLoadingPreviousMessages = false,
  messages,
  onCancelInviteRequest,
  onLoadPreviousMessages,
  onProfileClick,
  onRecruitClick,
  onRoommateRequestAccept,
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

  const recruitPostId =
    chatDetail.startSource === "recruit_post" ? chatDetail.recruitPostId : undefined;
  const { data: recruitPost } = usePostDetail(recruitPostId ?? 0);
  const recruitTitle = recruitPostId
    ? (recruitPost?.title ?? chatDetail.recruitTitle ?? "모집글")
    : undefined;
  const profileSummary = recruitPost
    ? [
        SEMESTER_LABEL[recruitPost.semester] ?? recruitPost.semester,
        DORMITORY_LABEL[recruitPost.dormitory] ?? recruitPost.dormitory,
        ROOM_SIZE_LABEL[recruitPost.roomSize] ?? recruitPost.roomSize,
      ]
    : chatDetail.profileSummary;

  return (
    <section
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
          profileSummary={profileSummary}
          recruitTitle={recruitTitle}
        />

        <ChatMessageList
          avatarSeed={chatDetail.id}
          fallbackDateLabel={chatDetail.dateLabel}
          messages={messages}
          onCancelInviteRequest={onCancelInviteRequest}
          onRoommateRequestAccept={onRoommateRequestAccept}
        />
      </div>
    </section>
  );
}

export { ChatMessageListSection };

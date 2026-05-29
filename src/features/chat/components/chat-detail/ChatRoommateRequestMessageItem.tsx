import { ProfileAvatar } from "@/components/ui";
import { ChatRoommateRequestMessage } from "@/features/chat/components/chat-detail/ChatRoommateRequestMessage";
import type { ChatMessage } from "@/features/chat/types";

type ChatRoommateRequestMessageItemProps = {
  avatarImageUrl?: string | null;
  avatarSeed: number;
  isProcessing?: boolean;
  message: Extract<ChatMessage, { type: "roommate_request" }>;
  onAccept?: (applicationId?: number) => void;
  onReject?: (applicationId?: number) => void;
};

export function ChatRoommateRequestMessageItem({
  avatarImageUrl,
  avatarSeed,
  isProcessing,
  message,
  onAccept,
  onReject,
}: ChatRoommateRequestMessageItemProps) {
  return (
    <div className="flex w-full items-end gap-200">
      <ProfileAvatar
        className="shrink-0 self-end"
        imageUrl={avatarImageUrl}
        seed={avatarSeed}
        size={36}
      />
      <ChatRoommateRequestMessage
        isProcessing={isProcessing}
        onAccept={() => onAccept?.(message.applicationId)}
        onReject={() => onReject?.(message.applicationId)}
        requesterName={message.requesterName}
      />
      {message.sentAt ? (
        <span className="shrink-0 whitespace-nowrap typo-caption4 text-text-disabled">
          {message.sentAt}
        </span>
      ) : null}
    </div>
  );
}

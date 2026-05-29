import { ChatRoommateInviteMessage } from "@/features/chat/components/chat-detail/ChatRoommateInviteMessage";
import type { ChatMessage } from "@/features/chat/types";

type ChatRoommateInviteMessageItemProps = {
  isCanceling?: boolean;
  message: Extract<ChatMessage, { type: "roommate_invite" }>;
  onCancel?: (messageId: number) => void;
};

export function ChatRoommateInviteMessageItem({
  isCanceling,
  message,
  onCancel,
}: ChatRoommateInviteMessageItemProps) {
  return (
    <div className="flex w-full justify-end">
      <ChatRoommateInviteMessage
        disabled={isCanceling || message.disabled}
        onCancel={() => onCancel?.(message.id)}
        recipientName={message.recipientName}
      />
    </div>
  );
}

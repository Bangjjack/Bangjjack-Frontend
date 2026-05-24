import { ChatDetailContent } from "@/features/chat";
import { useChatDetailPage } from "@/pages/chat/hooks";

export default function ChatDetailPage() {
  const chatDetailContentProps = useChatDetailPage();

  if (!chatDetailContentProps) {
    return null;
  }

  return (
    <ChatDetailContent key={chatDetailContentProps.chatDetail.id} {...chatDetailContentProps} />
  );
}

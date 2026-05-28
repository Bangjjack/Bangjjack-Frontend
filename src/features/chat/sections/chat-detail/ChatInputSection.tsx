import { ChatInputBar } from "@/components/ui";
import {
  ChatInputMenu,
  ChatRoomLeaveSheet,
  ChatRoommateInviteSheet,
} from "@/features/chat/components";
import type { ChatDetail, ChatInputMenuAction } from "@/features/chat/types";

export type ChatInputSectionProps = {
  chatDetail: ChatDetail;
  composer: {
    draftMessage: string;
    onSubmitMessage: () => void;
    onToggleInputMenu: () => void;
    onUpdateDraftMessage: (message: string) => void;
  };
  inputMenu: {
    isClosing: boolean;
    isOpen: boolean;
    onAction: (action: ChatInputMenuAction) => void;
    onClose: () => void;
    onCompleteClose: () => void;
  };
  inviteSheet: {
    isSendingInviteRequest?: boolean;
    onClose: () => void;
    onSendInviteRequest: () => void;
    open: boolean;
  };
  leaveSheet: {
    isLeavingChatRoom?: boolean;
    onClose: () => void;
    onLeaveChatRoom: () => void;
    open: boolean;
  };
};

function ChatInputSection({
  chatDetail,
  composer,
  inputMenu,
  inviteSheet,
  leaveSheet,
}: ChatInputSectionProps) {
  return (
    <>
      <div className="relative z-10">
        {inputMenu.isOpen ? (
          <>
            <button
              aria-label="입력 메뉴 닫기"
              className="fixed inset-0 z-10"
              onClick={inputMenu.onClose}
              type="button"
            />

            <div className="pointer-events-none absolute inset-x-400 bottom-full z-20 mb-200">
              <ChatInputMenu
                className="pointer-events-auto"
                isClosing={inputMenu.isClosing}
                onActionClick={inputMenu.onAction}
                onAnimationEnd={(event) => {
                  if (event.currentTarget !== event.target || !inputMenu.isClosing) {
                    return;
                  }

                  inputMenu.onCompleteClose();
                }}
              />
            </div>
          </>
        ) : null}

        <ChatInputBar
          isMenuOpen={inputMenu.isOpen}
          onChange={composer.onUpdateDraftMessage}
          onPlusClick={composer.onToggleInputMenu}
          onSubmit={composer.onSubmitMessage}
          value={composer.draftMessage}
        />
      </div>

      <ChatRoommateInviteSheet
        age={chatDetail.age}
        avatarSeed={chatDetail.id}
        department={chatDetail.department}
        lifestyleTags={chatDetail.lifestyleTags ?? chatDetail.profileSummary}
        nickname={chatDetail.nickname}
        open={inviteSheet.open}
        confirmDisabled={inviteSheet.isSendingInviteRequest ?? false}
        onCancel={inviteSheet.onClose}
        onConfirm={inviteSheet.onSendInviteRequest}
      />

      <ChatRoomLeaveSheet
        confirmDisabled={leaveSheet.isLeavingChatRoom ?? false}
        open={leaveSheet.open}
        onCancel={leaveSheet.onClose}
        onConfirm={() => {
          leaveSheet.onClose();
          leaveSheet.onLeaveChatRoom();
        }}
      />
    </>
  );
}

export { ChatInputSection };

import { ChatInputBar } from "@/components/ui";
import { ChatInputMenu, ChatRoommateInviteSheet } from "@/features/chat/components";
import type { ChatDetail, ChatInputMenuAction } from "@/features/chat/types";

export type ChatInputSectionProps = {
  chatDetail: ChatDetail;
  draftMessage: string;
  inputMenuClosing: boolean;
  inputMenuOpen: boolean;
  isSendingInviteRequest?: boolean;
  inviteSheetOpen: boolean;
  onCloseInputMenu: () => void;
  onCloseInviteSheet: () => void;
  onCompleteInputMenuClose: () => void;
  onInputMenuAction: (action: ChatInputMenuAction) => void;
  onSendInviteRequest: () => void;
  onSubmitMessage: () => void;
  onToggleInputMenu: () => void;
  onUpdateDraftMessage: (message: string) => void;
};

function ChatInputSection({
  chatDetail,
  draftMessage,
  inputMenuClosing,
  inputMenuOpen,
  isSendingInviteRequest = false,
  inviteSheetOpen,
  onCloseInputMenu,
  onCloseInviteSheet,
  onCompleteInputMenuClose,
  onInputMenuAction,
  onSendInviteRequest,
  onSubmitMessage,
  onToggleInputMenu,
  onUpdateDraftMessage,
}: ChatInputSectionProps) {
  return (
    <>
      <div className="relative z-10">
        {inputMenuOpen ? (
          <>
            <button
              aria-label="입력 메뉴 닫기"
              className="fixed inset-0 z-10"
              onClick={onCloseInputMenu}
              type="button"
            />

            <div className="pointer-events-none absolute inset-x-400 bottom-full z-20 mb-200">
              <ChatInputMenu
                className="pointer-events-auto"
                isClosing={inputMenuClosing}
                onActionClick={onInputMenuAction}
                onAnimationEnd={(event) => {
                  if (event.currentTarget !== event.target || !inputMenuClosing) {
                    return;
                  }

                  onCompleteInputMenuClose();
                }}
              />
            </div>
          </>
        ) : null}

        <ChatInputBar
          isMenuOpen={inputMenuOpen}
          onChange={onUpdateDraftMessage}
          onPlusClick={onToggleInputMenu}
          onSubmit={onSubmitMessage}
          value={draftMessage}
        />
      </div>

      <ChatRoommateInviteSheet
        age={chatDetail.age}
        avatarSeed={chatDetail.id}
        department={chatDetail.department}
        lifestyleTags={chatDetail.lifestyleTags ?? chatDetail.profileSummary}
        nickname={chatDetail.nickname}
        open={inviteSheetOpen}
        confirmDisabled={isSendingInviteRequest}
        onCancel={onCloseInviteSheet}
        onConfirm={onSendInviteRequest}
      />
    </>
  );
}

export { ChatInputSection };

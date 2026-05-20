import { useState } from "react";

import { BottomSheet, Button, ProfileAvatar, Tag } from "@/components/ui";
import type { ChatUserProfile } from "@/features/chat/types";

export type ChatRoommateInviteSheetProps = Pick<
  ChatUserProfile,
  "age" | "department" | "nickname"
> & {
  avatarSeed?: number;
  className?: string;
  lifestyleTags: string[];
  onCancel: () => void;
  onConfirm: () => void;
};

function ChatRoommateInviteSheet({
  age,
  avatarSeed,
  className,
  department,
  lifestyleTags,
  nickname,
  onCancel,
  onConfirm,
}: ChatRoommateInviteSheetProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <BottomSheet
      onClose={confirming ? onConfirm : onCancel}
      className={className}
      closeAriaLabel="룸메이트 요청 보내기 닫기"
    >
      {(requestClose) => (
        <div className="flex flex-col gap-400">
          <div className="flex flex-col gap-400">
            <h2 className="typo-h4 text-text-strong">룸메이트 요청 보내기</h2>
            <p className="typo-caption1 whitespace-pre-line text-text-placeholder">
              아래 상대방에게 룸메이트 초대를 보낼 수 있어요
              {"\n"}
              상대방이 수락하면 룸메이트로 확정돼요
            </p>
          </div>

          <div className="flex items-center gap-400 rounded-2xl border border-brand-primary bg-bg-secondary p-400">
            <ProfileAvatar seed={avatarSeed ?? nickname.length} size={36} />

            <div className="min-w-0 flex-1">
              <p className="typo-title3 text-text-normal">{nickname}</p>

              <div className="mt-100 flex flex-wrap items-center gap-1.5 typo-caption2 text-text-alternative">
                {age ? <span>{age}세</span> : null}
                {age && department ? (
                  <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
                ) : null}
                {department ? <span>{department}</span> : null}
              </div>

              <div className="mt-100 flex flex-wrap gap-100">
                {lifestyleTags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-200">
            <Button
              className="h-9 flex-1 cursor-pointer rounded-medium"
              onClick={requestClose}
              size="sm"
              variant="neutral"
            >
              취소
            </Button>
            <Button
              className="h-9 flex-1 cursor-pointer rounded-medium"
              onClick={() => {
                setConfirming(true);
                requestClose();
              }}
              size="sm"
            >
              초대 보내기
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}

export { ChatRoommateInviteSheet };

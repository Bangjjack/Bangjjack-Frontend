import { ProfileAvatar, Tag } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Member {
  nickname: string;
  seed: number;
  isHost?: boolean;
  profileImage?: string | null;
}

interface RoommateListProps {
  members: Member[];
  selectedNickname?: string;
  onMemberClick?: (member: Member) => void;
  onProfileClick?: (member: Member) => void;
}

function RoommateList({
  members,
  selectedNickname,
  onMemberClick,
  onProfileClick,
}: RoommateListProps) {
  return (
    <div className="flex flex-col items-start gap-[8px] self-stretch rounded-[10px] border border-border-normal bg-white px-[10px] py-[14px]">
      {members.length === 0 ? (
        <div className="flex w-full items-center justify-center py-500">
          <span className="typo-body2 text-text-caption">아직 참여한 룸메이트가 없어요</span>
        </div>
      ) : null}
      {members.map((member) => {
        const isSelected = selectedNickname === member.nickname;

        return (
          <button
            key={member.nickname}
            type="button"
            className={cn(
              "flex w-full cursor-pointer items-center justify-between rounded-[12px] px-[4px] py-[2px] transition-colors hover:bg-brand-primary-light/50",
              isSelected && "bg-brand-primary-light hover:bg-brand-primary-light",
            )}
            onClick={() => onMemberClick?.(member)}
          >
            <div className="flex items-center gap-200">
              <button
                type="button"
                className="flex shrink-0 items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  onProfileClick?.(member);
                }}
              >
                <ProfileAvatar size={24} imageUrl={member.profileImage} seed={member.seed} />
              </button>
              <span
                className={cn(
                  "typo-title3",
                  isSelected ? "text-text-primary-normal" : "text-text-strong",
                )}
              >
                {member.nickname}
              </span>
            </div>
            {member.isHost && <Tag color="black">방장</Tag>}
          </button>
        );
      })}
    </div>
  );
}

export { RoommateList, type Member };

import { ProfileAvatar, Tag } from "@/components/ui";

interface Member {
  nickname: string;
  seed: number;
  isHost?: boolean;
}

interface RoommateListProps {
  members: Member[];
}

function RoommateList({ members }: RoommateListProps) {
  return (
    <div className="flex flex-col items-start gap-[8px] self-stretch rounded-[10px] border border-border-normal bg-white px-[10px] py-[14px]">
      {members.map((member) => (
        <div
          key={member.nickname}
          className="flex items-center justify-between self-stretch rounded-[12px] px-[4px] py-[2px]"
        >
          <div className="flex items-center gap-200">
            <ProfileAvatar size={24} seed={member.seed} />
            <span className="typo-title3 text-text-strong">{member.nickname}</span>
          </div>
          {member.isHost && <Tag color="black">방장</Tag>}
        </div>
      ))}
    </div>
  );
}

export { RoommateList, type Member };

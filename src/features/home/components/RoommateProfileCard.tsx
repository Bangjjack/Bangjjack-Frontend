import { cn } from "@/lib/cn";
import { Tag } from "@/components/ui/index";
import { ProfileAvatar } from "@/components/ui";

type RoommateProfileCardProps = {
  className?: string;
  nickname: string;
  age: number;
  department: string;
  matchRate: number;
  profileImage?: string;
  tags: string[];
  onClick?: () => void;
};

function RoommateProfileCard({
  className,
  nickname,
  age,
  department,
  matchRate,
  profileImage,
  tags,
  onClick,
}: RoommateProfileCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "flex w-[200px] shrink-0 cursor-pointer flex-col items-start rounded-small bg-bg-secondary px-[14px] py-450 text-left hover:brightness-[0.98] active:brightness-95",
        className,
      )}
      onClick={onClick}
    >
      {/* 매칭률 */}
      <p className="typo-title1 text-text-strong">
        나와의
        <br />
        매칭률 <span className="text-text-primary-alternative">{matchRate}%</span>
      </p>

      {/* 프로필 이미지 */}
      <div className="flex w-full items-center justify-center py-200">
        {profileImage ? (
          <img
            src={profileImage}
            alt={`${nickname} 프로필`}
            className="size-[70px] rounded-full object-cover"
          />
        ) : (
          <ProfileAvatar size={70} seed={nickname.length} />
        )}
      </div>

      {/* 닉네임 */}
      <p className="typo-title2 w-full text-text-strong">{nickname}</p>

      {/* 나이 · 학과 */}
      <div className="mt-[6px] flex items-center gap-[6px]">
        <span className="typo-label2 text-text-alternative">{age}세</span>
        <span className="h-[12px] w-px bg-neutral-300" aria-hidden="true" />
        <span className="typo-label2 text-text-alternative">{department}</span>
      </div>

      {/* 태그 */}
      <div className="mt-[6px] flex flex-wrap gap-[6px]">
        {tags.map((tag) => (
          <Tag key={tag} color="black">
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
}

export { RoommateProfileCard };
export type { RoommateProfileCardProps };

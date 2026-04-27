import { cn } from "@/lib/cn";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProfileMintIcon, ProfileOrangeIcon } from "@/assets/icons";
import { useMemo } from "react";

const PROFILE_ICONS = [ProfileMintIcon, ProfileOrangeIcon] as const;

type ProfileAvatarSize = 24 | 36 | 40 | 48 | 70 | 100;

const SIZE_CLASS: Record<ProfileAvatarSize, string> = {
  24: "size-[24px]",
  36: "size-[36px]",
  40: "size-10",
  48: "size-[48px]",
  70: "size-[70px]",
  100: "size-[100px]",
};

type ProfileAvatarProps = {
  className?: string;
  /** 같은 seed는 항상 같은 아이콘을 반환 */
  seed?: number;
  size?: ProfileAvatarSize;
};

function getRandomIcon(seed?: number) {
  const index =
    seed !== undefined
      ? Math.abs(seed) % PROFILE_ICONS.length
      : Math.floor(Math.random() * PROFILE_ICONS.length);

  const Icon = PROFILE_ICONS[index] ?? ProfileOrangeIcon;

  return <Icon className="size-full" />;
}

function ProfileAvatar({ className, seed, size = 70 }: ProfileAvatarProps) {
  const iconElement = useMemo(() => getRandomIcon(seed), [seed]);

  return (
    <Avatar className={cn(SIZE_CLASS[size], className)}>
      <AvatarFallback className="bg-transparent">{iconElement}</AvatarFallback>
    </Avatar>
  );
}

export { ProfileAvatar };
export type { ProfileAvatarProps };

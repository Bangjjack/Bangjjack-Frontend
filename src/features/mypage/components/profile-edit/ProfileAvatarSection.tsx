import { ProfileAvatar } from "@/components/ui";
import type { ProfileAvatarSectionProps } from "@/features/mypage/types";

function ProfileAvatarSection({ imageUrl, name }: ProfileAvatarSectionProps) {
  return (
    <div className="flex flex-col items-start px-3.5 pt-600">
      <ProfileAvatar imageUrl={imageUrl} seed={name.length} size={100} variant="orange" />
    </div>
  );
}

export { ProfileAvatarSection };

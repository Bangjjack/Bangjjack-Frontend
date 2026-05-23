import { ProfileAvatar } from "@/components/ui";
import type { ProfileAvatarSectionProps } from "@/features/mypage/types";

function ProfileAvatarSection({ imageUrl, name }: ProfileAvatarSectionProps) {
  return (
    <div className="flex flex-col items-start px-3.5 pt-600">
      {imageUrl ? (
        <img
          alt=""
          className="size-25 rounded-full bg-bg-secondary object-cover"
          src={imageUrl}
        />
      ) : (
        <ProfileAvatar seed={name.length} size={100} variant="orange" />
      )}
    </div>
  );
}

export { ProfileAvatarSection };

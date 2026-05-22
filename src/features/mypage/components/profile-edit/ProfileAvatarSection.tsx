import { ProfileAvatar } from "@/components/ui";
import type { ProfileAvatarSectionProps } from "@/features/mypage/types";
import { cn } from "@/lib/cn";

function ProfileAvatarSection({ imageUrl, isEditing, name }: ProfileAvatarSectionProps) {
  return (
    <div className="flex flex-col items-start px-3.5 pt-600">
      <div className={cn("relative", isEditing && "w-28")}>
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
    </div>
  );
}

export { ProfileAvatarSection };

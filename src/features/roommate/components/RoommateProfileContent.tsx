import { waveImage } from "@/assets/images";
import { Header, ProfileAvatar, Tag } from "@/components/ui";
import { DORMITORY_LABEL, ROOMMATE_PREFERENCE_LABEL, SEMESTER_LABEL } from "@/constants";
import { MatchActionBar } from "@/features/board/components/roommate";
import type { ChatDetail } from "@/features/chat/types";
import { mapLifestyleChecklistToEntries } from "@/features/board/utils";
import { ChecklistCard, ImportanceSection } from "@/features/roommate/components";
import { useUserProfile } from "@/features/user/hooks";
import { useFadeInOnScroll, useGoBack } from "@/hooks";
import { getAgeFromBirthYear, parseDepartmentName } from "@/utils";
import { useNavigate } from "react-router";

type RoommateProfileContentProps = {
  profile?: ChatDetail;
  roommateId?: number;
};

function RoommateProfileContent({ profile, roommateId }: RoommateProfileContentProps) {
  const handleBackClick = useGoBack();
  const contentRef = useFadeInOnScroll<HTMLDivElement>();
  const navigate = useNavigate();

  const { data: userProfile, isLoading, isError } = useUserProfile(roommateId ?? 0);

  const nickname = userProfile?.username ?? profile?.nickname ?? "";
  const grade = userProfile?.grade;
  const age = userProfile ? getAgeFromBirthYear(userProfile.birthYear) : (profile?.age ?? 0);
  const department = parseDepartmentName(userProfile?.departmentName ?? profile?.department ?? "");
  const tags = userProfile
    ? [
        SEMESTER_LABEL[userProfile.semester] ?? userProfile.semester,
        DORMITORY_LABEL[userProfile.dormitory] ?? userProfile.dormitory,
      ]
    : [];
  const importanceItems = (userProfile?.roommatePreferences ?? []).map(
    (pref) => ROOMMATE_PREFERENCE_LABEL[pref] ?? pref,
  );
  const checklist = userProfile
    ? mapLifestyleChecklistToEntries(userProfile.lifestyleChecklist)
    : [];
  const avatarSeed = profile?.id ?? nickname.length;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      {/* Fixed header - transparent, overlays wave */}
      <Header
        className="absolute inset-x-0 top-0 z-20"
        showBack
        title="룸메이트 추천"
        onBackClick={handleBackClick}
      />

      {/* Scrollable content */}
      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto pb-[100px]">
        {/* Wave background - tucked behind fixed header */}
        <img alt="" aria-hidden="true" className="w-full" src={waveImage} />

        {/* Content */}
        <div ref={contentRef} className="flex flex-col gap-300 px-400">
          {/* Profile avatar - overlaps wave by half */}
          <div className="-mt-[65px] flex flex-col items-start px-[14px]">
            <ProfileAvatar size={100} seed={avatarSeed} />
          </div>

          {isError && (
            <p className="typo-body1 py-400 text-center text-text-caption">
              프로필을 불러오지 못했어요
            </p>
          )}

          {!isError && (
            <>
              {/* Profile info */}
              <div className="flex flex-col gap-[6px] px-100 pt-300">
                {isLoading ? (
                  <div className="h-[28px] w-[120px] animate-pulse rounded bg-neutral-200" />
                ) : (
                  <h2 className="typo-title1 text-text-strong">{nickname}</h2>
                )}
                <div className="flex items-center gap-[6px]">
                  {isLoading ? (
                    <div className="h-[18px] w-[160px] animate-pulse rounded bg-neutral-200" />
                  ) : (
                    <>
                      {grade !== undefined && (
                        <>
                          <span className="typo-label2 text-text-alternative">{grade}학년</span>
                          <span aria-hidden="true" className="h-[12px] w-px bg-neutral-300" />
                        </>
                      )}
                      <span className="typo-label2 text-text-alternative">{age}세</span>
                      <span aria-hidden="true" className="h-[12px] w-px bg-neutral-300" />
                      <span className="typo-label2 text-text-alternative">{department}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-[6px] px-100 pb-300">
                {tags.map((tag) => (
                  <Tag key={tag} color="black">
                    {tag}
                  </Tag>
                ))}
              </div>

              {/* Importance section */}
              {importanceItems.length > 0 && <ImportanceSection items={importanceItems} />}

              {/* Checklist */}
              {checklist.length > 0 && <ChecklistCard items={checklist} nickname={nickname} />}
            </>
          )}
        </div>
      </main>

      {/* Bottom action buttons */}
      <MatchActionBar
        postId={roommateId ?? 0}
        matchRate={88}
        matchHighlights={["청소 빈도", "수면 습관"]}
        onMatchConfirm={() => navigate(`/roommate/${roommateId}/matching-report`)}
        onChatConfirm={() => navigate("/chat")}
      />
    </div>
  );
}

export { RoommateProfileContent };

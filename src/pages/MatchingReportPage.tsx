import { useParams, useLocation } from "react-router";

import { MatchingReportContent } from "@/features/roommate/components";

export default function MatchingReportPage() {
  const { id } = useParams();
  const roommateId = Number(id);
  const { state } = useLocation();

  return (
    <MatchingReportContent
      roommateId={Number.isNaN(roommateId) ? undefined : roommateId}
      targetUserId={Number.isNaN(roommateId) ? undefined : roommateId}
      targetUsername={state?.targetUsername as string | undefined}
      targetProfileImage={state?.targetProfileImage as string | null | undefined}
    />
  );
}

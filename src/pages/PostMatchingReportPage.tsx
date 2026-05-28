import { useParams, useLocation } from "react-router";

import { MatchingReportContent } from "@/features/roommate/components";

export default function PostMatchingReportPage() {
  const { postId } = useParams();
  const id = Number(postId);
  const { state } = useLocation();

  return (
    <MatchingReportContent
      postId={Number.isNaN(id) ? undefined : id}
      targetUserId={state?.targetUserId as number | undefined}
      targetUsername={state?.targetUsername as string | undefined}
      targetProfileImage={state?.targetProfileImage as string | null | undefined}
    />
  );
}

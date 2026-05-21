import { useParams } from "react-router";

import { MatchingReportContent } from "@/features/roommate/components";

export default function PostMatchingReportPage() {
  const { postId } = useParams();
  const id = Number(postId);

  return <MatchingReportContent postId={Number.isNaN(id) ? undefined : id} />;
}

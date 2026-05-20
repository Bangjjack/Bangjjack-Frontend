import { useParams } from "react-router";

import { MatchingReportContent } from "@/features/roommate/components";

export default function MatchingReportPage() {
  const { id } = useParams();
  const roommateId = Number(id);

  return <MatchingReportContent roommateId={Number.isNaN(roommateId) ? undefined : roommateId} />;
}

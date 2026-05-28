import { useParams } from "react-router";

import { RoommateProfileContent } from "@/features/roommate/components";

export default function RoommateProfilePage() {
  const { id } = useParams();
  const roommateId = Number(id);
  const validId = Number.isNaN(roommateId) ? undefined : roommateId;

  return <RoommateProfileContent roommateId={validId} />;
}

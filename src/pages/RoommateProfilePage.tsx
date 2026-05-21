import { useParams } from "react-router";

import { CHAT_DETAILS } from "@/features/chat";
import { RoommateProfileContent } from "@/features/roommate/components";

export default function RoommateProfilePage() {
  const { id } = useParams();
  const roommateId = Number(id);
  const validId = Number.isNaN(roommateId) ? undefined : roommateId;
  const profile = validId !== undefined ? CHAT_DETAILS[validId] : undefined;

  return <RoommateProfileContent profile={profile} roommateId={validId} />;
}

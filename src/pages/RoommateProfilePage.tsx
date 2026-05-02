import { useParams } from "react-router";

import { CHAT_DETAILS } from "@/features/chat";
import { RoommateProfileContent } from "@/features/roommate/components";

export default function RoommateProfilePage() {
  const { id } = useParams();
  const roommateId = Number(id);
  const profile = Number.isNaN(roommateId) ? undefined : CHAT_DETAILS[roommateId];

  return <RoommateProfileContent profile={profile} />;
}

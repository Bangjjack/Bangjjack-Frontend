import { useNavigate } from "react-router";

import { MatchCard } from "@/features/mypage/components/activity/MatchCard";
import { MY_ACTIVITY_MATCHES } from "@/features/mypage/mocks";

function MyActivityMatchList() {
  const navigate = useNavigate();

  if (MY_ACTIVITY_MATCHES.length === 0) {
    return <MyActivityMatchEmptyState />;
  }

  return (
    <div className="flex flex-col gap-400">
      {MY_ACTIVITY_MATCHES.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          onChatClick={(matchId) => navigate(`/chat/${matchId}`)}
          onProfileClick={(matchId) => navigate(`/roommate/${matchId}`)}
        />
      ))}
    </div>
  );
}

function MyActivityMatchEmptyState() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl p-400">
      <p className="typo-caption1 text-center text-text-disabled">아직 매칭 내역이 없어요</p>
    </div>
  );
}

export { MyActivityMatchList };

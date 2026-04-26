import { useNavigate } from "react-router";

import { BoardPageContent } from "@/features/board/components";

export default function BoardPage() {
  const navigate = useNavigate();

  // TODO: 실제 첫 진입 여부는 API/상태로 판별
  const isFirstVisit = true;

  return (
    <BoardPageContent
      showAiRecommend={isFirstVisit}
      onPostClick={(id) => navigate(`/board/${id}`)}
      onAiRecommendClick={() => console.log("ai recommend click")}
      onWriteClick={() => console.log("write click")}
    />
  );
}

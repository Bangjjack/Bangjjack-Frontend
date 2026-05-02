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
      // TODO: AI 추천 페이지/모달 라우팅 연결
      onAiRecommendClick={() => console.log("ai recommend click")}
      // TODO: 글쓰기 페이지 라우팅 연결 (e.g. navigate("/board/new"))
      onWriteClick={() => console.log("write click")}
    />
  );
}

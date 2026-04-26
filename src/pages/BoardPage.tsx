import { BoardPageContent } from "@/features/board/components";

export default function BoardPage() {
  // TODO: 실제 첫 진입 여부는 API/상태로 판별
  const isFirstVisit = true;

  return (
    <BoardPageContent
      showAiRecommend={isFirstVisit}
      onPostClick={(id) => console.log("post click", id)}
      onAiRecommendClick={() => console.log("ai recommend click")}
      onWriteClick={() => console.log("write click")}
    />
  );
}

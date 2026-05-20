import { useState } from "react";
import { useNavigate } from "react-router";

import { AiRecommendBottomSheet, BoardPageContent } from "@/features/board/components";

const AI_RECOMMEND_SEEN_KEY = "ai-recommend-seen";

export default function BoardPage() {
  const navigate = useNavigate();
  const [showAiRecommend, setShowAiRecommend] = useState(
    () => localStorage.getItem(AI_RECOMMEND_SEEN_KEY) !== "true",
  );
  const [aiRecommend, setAiRecommend] = useState(false);

  const handleAiRecommendClose = () => {
    localStorage.setItem(AI_RECOMMEND_SEEN_KEY, "true");
    setShowAiRecommend(false);
  };

  const handleAiRecommendConfirm = () => {
    localStorage.setItem(AI_RECOMMEND_SEEN_KEY, "true");
    setShowAiRecommend(false);
    setAiRecommend(true);
  };

  return (
    <>
      <BoardPageContent
        aiRecommend={aiRecommend}
        onAiRecommendChange={setAiRecommend}
        onPostClick={(id) => navigate(`/board/${id}`)}
        onWriteClick={() => navigate("/board/write")}
      />
      <AiRecommendBottomSheet
        open={showAiRecommend}
        onClose={handleAiRecommendClose}
        onConfirm={handleAiRecommendConfirm}
      />
    </>
  );
}

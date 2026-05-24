import { Navigate, type RouteObject } from "react-router";
import MainPage from "@/pages/MainPage";
import ChatListPage from "@/pages/chat/ChatListPage";
import ChatDetailPage from "@/pages/chat/ChatDetailPage";
import ChatRoommateConfirmedPage from "@/pages/chat/ChatRoommateConfirmedPage";
import DesignSystemPage from "@/pages/DesignSystemPage";
import HomePage from "@/pages/HomePage";
import MyActivityPage from "@/pages/MyActivityPage";
import MyBookmarkPage from "@/pages/MyBookmarkPage";
import MyPage from "@/pages/MyPage";
import MyChecklistPage from "@/pages/MyChecklistPage";
import MyProfileEditPage from "@/pages/MyProfileEditPage";
import OnBoardingPage from "@/pages/OnBoardingPage";
import BoardPage from "@/pages/BoardPage";
import LoginPage from "@/pages/LoginPage";
import LoginCallbackPage from "@/pages/LoginCallbackPage";
import PostDetailPage from "@/pages/PostDetailPage";
import PostEditPage from "@/pages/PostEditPage";
import PostWritePage from "@/pages/PostWritePage";
import PostChecklistPage from "@/pages/PostChecklistPage";
import RoommateListPage from "@/pages/RoommateListPage";
import RoommateProfilePage from "@/pages/RoommateProfilePage";
import MatchingReportPage from "@/pages/MatchingReportPage";
import PostMatchingReportPage from "@/pages/PostMatchingReportPage";
import ProtectedRoute from "@/routes/ProtectedRoute";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/login/callback",
    element: <LoginCallbackPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/onboarding",
        element: <OnBoardingPage />,
      },
      {
        path: "/",
        element: <MainPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/home" replace />,
          },
          {
            path: "home",
            element: <HomePage />,
          },
          {
            path: "board",
            element: <BoardPage />,
          },
          {
            path: "chat",
            element: <ChatListPage />,
          },
          {
            path: "mypage",
            element: <MyPage />,
          },
          {
            path: "mypage/activity",
            element: <MyActivityPage />,
          },
          {
            path: "mypage/bookmarks",
            element: <MyBookmarkPage />,
          },
          {
            path: "mypage/checklist",
            element: <MyChecklistPage />,
          },
          {
            path: "mypage/profile",
            element: <MyProfileEditPage />,
          },
        ],
      },
      {
        path: "/chat/:chatId",
        element: <ChatDetailPage />,
      },
      {
        path: "/chat/:chatId/roommate-confirmed",
        element: <ChatRoommateConfirmedPage />,
      },
      {
        path: "/board/write",
        element: <PostWritePage />,
      },
      {
        path: "/board/write/checklist",
        element: <PostChecklistPage />,
      },
      {
        path: "/board/:id",
        element: <PostDetailPage />,
      },
      {
        path: "/board/:id/edit",
        element: <PostEditPage />,
      },
      {
        path: "/board/:id/roommates",
        element: <RoommateListPage />,
      },
      {
        path: "/posts/:postId/matching-report",
        element: <PostMatchingReportPage />,
      },
      {
        path: "/roommate/:id",
        element: <RoommateProfilePage />,
      },
      {
        path: "/roommate/:id/matching-report",
        element: <MatchingReportPage />,
      },
    ],
  },
  {
    path: "/design-system",
    element: <DesignSystemPage />,
  },
];

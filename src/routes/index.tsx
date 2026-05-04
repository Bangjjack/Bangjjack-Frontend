import { Navigate, type RouteObject } from "react-router";
import MainPage from "@/pages/MainPage";
import ChatPage from "@/pages/ChatPage";
import ChatDetailPage from "@/pages/ChatDetailPage";
import ChatRoommateConfirmedPage from "@/pages/ChatRoommateConfirmedPage";
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
import PostDetailPage from "@/pages/PostDetailPage";
import RoommateListPage from "@/pages/RoommateListPage";
import RoommateProfilePage from "@/pages/RoommateProfilePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
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
        element: <ChatPage />,
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
    path: "/login",
    element: <LoginPage />,
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
    path: "/onboarding",
    element: <OnBoardingPage />,
  },
  {
    path: "/board/:id",
    element: <PostDetailPage />,
  },
  {
    path: "/board/:id/roommates",
    element: <RoommateListPage />,
  },
  {
    path: "/roommate/:id",
    element: <RoommateProfilePage />,
  },
  {
    path: "/design-system",
    element: <DesignSystemPage />,
  },
];

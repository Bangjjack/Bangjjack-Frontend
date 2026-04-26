import { Navigate, type RouteObject } from "react-router";
import MainPage from "@/pages/MainPage";
import ChatPage from "@/pages/ChatPage";
import DesignSystemPage from "@/pages/DesignSystemPage";
import HomePage from "@/pages/HomePage";
import MyPage from "@/pages/MyPage";
import OnBoardingPage from "@/pages/OnBoardingPage";
import BoardPage from "@/pages/BoardPage";
import LoginPage from "@/pages/LoginPage";
import PostDetailPage from "@/pages/PostDetailPage";
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
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
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
    path: "/roommate/:id",
    element: <RoommateProfilePage />,
  },
  {
    path: "/design-system",
    element: <DesignSystemPage />,
  },
];

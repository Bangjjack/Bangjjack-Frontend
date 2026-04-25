import { Navigate, type RouteObject } from "react-router";
import MainPage from "@/pages/MainPage";
import ChatPage from "@/pages/ChatPage";
import ChatDetailPage from "@/pages/ChatDetailPage";
import DesignSystemPage from "@/pages/DesignSystemPage";
import HomePage from "@/pages/HomePage";
import MyPage from "@/pages/MyPage";
import OnBoardingPage from "@/pages/OnBoardingPage";
import RoomPage from "@/pages/RoomPage";
import LoginPage from "@/pages/LoginPage";
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
        path: "room",
        element: <RoomPage />,
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
    path: "/chat/:chatId",
    element: <ChatDetailPage />,
  },
  {
    path: "/onboarding",
    element: <OnBoardingPage />,
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

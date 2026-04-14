import type { RouteObject } from "react-router";
import MainPage from "@/pages/MainPage";
import ChatPage from "@/pages/ChatPage";
import DesignSystemPage from "@/pages/DesignSystemPage";
import HomePage from "@/pages/HomePage";
import MyPage from "@/pages/MyPage";
import RoomPage from "@/pages/RoomPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        index: true,
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
    path: "/design-system",
    element: <DesignSystemPage />,
  },
];

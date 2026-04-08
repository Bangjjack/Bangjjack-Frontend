import type { RouteObject } from "react-router";
import MainPage from "@/pages/MainPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
  },
];

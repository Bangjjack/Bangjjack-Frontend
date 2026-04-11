import type { RouteObject } from "react-router";
import MainPage from "@/pages/MainPage";
import DesignSystemPage from "@/pages/DesignSystemPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/design-system",
    element: <DesignSystemPage />,
  },
];

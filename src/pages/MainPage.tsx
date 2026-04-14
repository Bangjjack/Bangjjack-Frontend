import { BottomNav, Header } from "@/components/ui";
import type { HeaderProps } from "@/components/ui";
import type { BottomNavIcon } from "@/types/bottomNav";
import { Outlet, useLocation, useNavigate } from "react-router";

type RouteConfig = {
  header: Pick<HeaderProps, "showBack" | "showMore" | "showProfile" | "title" | "variant">;
  icon: BottomNavIcon;
  path: string;
};

const ROUTE_CONFIG: Record<string, RouteConfig> = {
  "/": {
    header: { variant: "home" },
    icon: "home",
    path: "/",
  },
  "/chat": {
    header: { showBack: true, title: "채팅", variant: "title" },
    icon: "chat",
    path: "/chat",
  },
  "/mypage": {
    header: { showBack: true, title: "마이페이지", variant: "title" },
    icon: "mypage",
    path: "/mypage",
  },
  "/room": {
    header: { title: "방 찾기", variant: "title" },
    icon: "room",
    path: "/room",
  },
};

const DEFAULT_ROUTE_CONFIG: RouteConfig = {
  header: { variant: "home" },
  icon: "home",
  path: "/",
};

const BOTTOM_NAV_ITEMS = Object.values(ROUTE_CONFIG).map(({ icon, path }) => ({
  href: path,
  icon,
  label:
    icon === "home" ? "홈" : icon === "room" ? "방 찾기" : icon === "chat" ? "채팅" : "MY",
}));

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeConfig = ROUTE_CONFIG[location.pathname] ?? DEFAULT_ROUTE_CONFIG;

  const handleBackClick = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header {...routeConfig.header} onBackClick={handleBackClick} userName="방짝" />
      <main
        className="layout-figma-frame min-h-0 flex-1 overflow-hidden px-400"
        style={{ "--width-figma-frame": "430px" } as React.CSSProperties}
      >
        <div className="scrollbar-none h-full overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <div className="p-400">
        <BottomNav activeIcon={routeConfig.icon} items={BOTTOM_NAV_ITEMS} />
      </div>
    </div>
  );
}

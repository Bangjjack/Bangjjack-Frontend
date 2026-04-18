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
  "/home": {
    header: { variant: "home" },
    icon: "home",
    path: "/home",
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
  path: "/home",
};

const BOTTOM_NAV_ITEMS = [
  { href: "/home", icon: "home", label: "홈" },
  { href: "/room", icon: "room", label: "방 찾기" },
  { href: "/chat", icon: "chat", label: "채팅" },
  { href: "/mypage", icon: "mypage", label: "MY" },
] satisfies Array<{ href: string; icon: BottomNavIcon; label: string }>;

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeConfig = ROUTE_CONFIG[location.pathname] ?? DEFAULT_ROUTE_CONFIG;

  const handleBackClick = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate("/home");
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header {...routeConfig.header} onBackClick={handleBackClick} userName="방짝" />
      <main className="min-h-0 flex-1 overflow-hidden px-400">
        <div className="scrollbar-none h-full overflow-y-auto pb-28.25">
          <Outlet />
        </div>
      </main>
      <div className="absolute bottom-0 left-0 right-0 z-40 p-400">
        <BottomNav activeIcon={routeConfig.icon} items={BOTTOM_NAV_ITEMS} />
      </div>
    </div>
  );
}

import { BottomNav, Header } from "@/components/ui";
import type { HeaderProps } from "@/components/ui";
import { useGoBack } from "@/hooks/useGoBack";
import { useAuthStore } from "@/stores/authStore";
import type { BottomNavIcon } from "@/types/bottomNav";
import { matchPath, Outlet, useLocation } from "react-router";

type RouteConfig = {
  activeIcon: BottomNavIcon;
  header: Pick<HeaderProps, "showBack" | "showMore" | "showProfile" | "title" | "variant">;
  fullBleed?: boolean;
  showBottomNav?: boolean;
};

type RouteConfigEntry = RouteConfig & {
  pattern: string;
};

const ROUTE_CONFIGS: RouteConfigEntry[] = [
  {
    activeIcon: "home",
    header: { variant: "home" },
    pattern: "/home",
  },
  {
    activeIcon: "chat",
    header: { title: "채팅", variant: "title" },
    pattern: "/chat",
  },
  {
    activeIcon: "mypage",
    header: { title: "마이페이지", variant: "title" },
    pattern: "/mypage",
  },
  {
    activeIcon: "mypage",
    header: { showBack: true, title: "나의 활동", variant: "title" },
    pattern: "/mypage/activity",
  },
  {
    activeIcon: "mypage",
    header: { showBack: true, title: "마이페이지", variant: "title" },
    pattern: "/mypage/bookmarks",
  },
  {
    activeIcon: "mypage",
    header: { variant: "none" },
    pattern: "/mypage/checklist",
  },
  {
    activeIcon: "mypage",
    fullBleed: true,
    header: { variant: "none" },
    pattern: "/mypage/profile",
    showBottomNav: false,
  },
  {
    activeIcon: "room",
    header: { title: "방 찾기", variant: "title" },
    pattern: "/board",
  },
];

const DEFAULT_ROUTE_CONFIG: RouteConfig = {
  activeIcon: "home",
  header: { variant: "home" },
};

const BOTTOM_NAV_ITEMS = [
  { href: "/home", icon: "home", label: "홈" },
  { href: "/board", icon: "room", label: "방 찾기" },
  { href: "/chat", icon: "chat", label: "채팅" },
  { href: "/mypage", icon: "mypage", label: "MY" },
] satisfies Array<{ href: string; icon: BottomNavIcon; label: string }>;

function getRouteConfig(pathname: string) {
  return (
    ROUTE_CONFIGS.find(({ pattern }) => matchPath({ path: pattern, end: true }, pathname)) ??
    DEFAULT_ROUTE_CONFIG
  );
}

export default function MainPage() {
  const location = useLocation();
  const routeConfig = getRouteConfig(location.pathname);
  const handleBackClick = useGoBack();
  const username = useAuthStore((state) => state.username);

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header
        {...routeConfig.header}
        onBackClick={handleBackClick}
        userName={username ?? undefined}
      />
      <main
        className={
          routeConfig.fullBleed
            ? "min-h-0 flex-1 overflow-hidden"
            : "min-h-0 flex-1 overflow-hidden px-400"
        }
      >
        <div
          className={
            routeConfig.showBottomNav === false
              ? "scrollbar-none h-full overflow-y-auto"
              : "scrollbar-none h-full overflow-y-auto pb-28.25"
          }
        >
          <Outlet />
        </div>
      </main>
      {routeConfig.showBottomNav === false ? null : (
        <div className="absolute bottom-0 left-0 right-0 z-40 p-400">
          <BottomNav activeIcon={routeConfig.activeIcon} items={BOTTOM_NAV_ITEMS} />
        </div>
      )}
    </div>
  );
}

import { Navigate, Outlet, useLocation } from "react-router";
import { ACCESS_TOKEN_KEY } from "@/constants";
import { useAuthStore } from "@/stores/authStore";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasAccessToken = Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  if (!isAuthenticated || !hasAccessToken) {
    if (code) {
      return <Navigate to={`/login/callback?code=${encodeURIComponent(code)}`} replace />;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

import { Navigate, Outlet, useLocation } from "react-router";
import { MASTER_ACCESS_TOKEN } from "@/constants";
import { useAuthStore } from "@/stores/authStore";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const canUseMasterToken = Boolean(MASTER_ACCESS_TOKEN);
  const location = useLocation();

  if (!isAuthenticated && !canUseMasterToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

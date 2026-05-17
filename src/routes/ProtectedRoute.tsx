import { Navigate, Outlet, useLocation } from "react-router";
import { ACCESS_TOKEN_KEY } from "@/constants/auth";

export default function ProtectedRoute() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

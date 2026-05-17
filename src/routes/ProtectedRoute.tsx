import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { ACCESS_TOKEN_KEY } from "@/constants/auth";
import { toast } from "@/components/ui";

export default function ProtectedRoute() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("로그인이 필요합니다.");
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <Outlet />;
}

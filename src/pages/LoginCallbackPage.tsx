import { useEffect, useRef } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import { toast } from "@/components/ui";
import { ACCESS_TOKEN_KEY } from "@/constants";
import { useExchangeAuthToken } from "@/features/auth";
import { useAuthStore } from "@/stores/authStore";

export default function LoginCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasExchangedCode = useRef(false);
  const code = searchParams.get("code");
  const { mutateAsync: exchangeAuthToken } = useExchangeAuthToken();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      hasExchangedCode.current = true;
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const exchangeCode = async () => {
      if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
        hasExchangedCode.current = true;
        return;
      }

      if (!code) {
        return;
      }

      if (hasExchangedCode.current) {
        return;
      }

      hasExchangedCode.current = true;

      try {
        const authTokenResponse = await exchangeAuthToken({ code });
        const { accessToken, isOnboarded, userId, username } = authTokenResponse;

        setAuth(accessToken, userId, username, isOnboarded);
        navigate("/home", { replace: true });
      } catch {
        toast.error("로그인에 실패했습니다.");
        navigate("/login", { replace: true });
      }
    };

    void exchangeCode();
  }, [code, exchangeAuthToken, navigate, setAuth]);

  if (!code) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-neutral-50 px-400">
      <p className="typo-body2 text-text-alternative">Logging in...</p>
    </div>
  );
}

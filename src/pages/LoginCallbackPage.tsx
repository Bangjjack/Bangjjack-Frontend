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
      console.info("[auth] Already authenticated. Redirecting to /home.");
      hasExchangedCode.current = true;
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const exchangeCode = async () => {
      if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
        console.info("[auth] Access token exists. Skipping auth code exchange.");
        hasExchangedCode.current = true;
        return;
      }

      if (!code) {
        console.warn("[auth] Login callback code is missing. Redirecting to /login.");
        return;
      }

      if (hasExchangedCode.current) {
        console.info("[auth] Auth code exchange already requested. Skipping duplicate request.");
        return;
      }

      console.info("[auth] Starting auth code exchange.");
      hasExchangedCode.current = true;

      try {
        const { accessToken, userId, username } = await exchangeAuthToken({ code });

        console.info("[auth] Auth code exchange succeeded.", {
          hasAccessToken: Boolean(accessToken),
          userId,
          username,
        });

        setAuth(accessToken, userId, username);
        console.info("[auth] Auth state saved. Redirecting to /onboarding.");
        navigate("/onboarding", { replace: true });
      } catch (error) {
        console.error("[auth] Auth code exchange failed. Redirecting to /login.", error);
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

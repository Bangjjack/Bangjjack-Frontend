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
  const { mutate: exchangeAuthToken } = useExchangeAuthToken();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      window.location.replace("/onboarding");
    }
  }, []);

  useEffect(() => {
    if (!code || hasExchangedCode.current) {
      return;
    }

    hasExchangedCode.current = true;

    exchangeAuthToken(
      { code },
      {
        onSuccess: ({ accessToken, userId, username }) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
          setAuth(userId, username);
          window.location.replace("/onboarding");
        },
        onError: () => {
          toast.error("Login failed.");
          navigate("/login", { replace: true });
        },
      },
    );
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

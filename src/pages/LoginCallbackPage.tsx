import { isAxiosError } from "axios";
import { useEffect, useRef } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import type { ApiResponse } from "@/api";
import { ACCESS_TOKEN_KEY } from "@/constants";
import { useExchangeAuthToken } from "@/features/auth";
import { useAuthStore } from "@/stores/authStore";

const DEFAULT_LOGIN_ERROR_MESSAGE = "로그인에 실패했습니다.";

const getLoginErrorMessage = (error: unknown) => {
  if (isAxiosError<ApiResponse<null>>(error)) {
    return error.response?.data.message ?? DEFAULT_LOGIN_ERROR_MESSAGE;
  }

  return DEFAULT_LOGIN_ERROR_MESSAGE;
};

export default function LoginCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasExchangedCode = useRef(false);
  const code = searchParams.get("code");
  const { mutate: exchangeAuthToken } = useExchangeAuthToken();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      hasExchangedCode.current = true;
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const exchangeCode = () => {
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

      exchangeAuthToken(
        { code },
        {
          onSuccess: ({ accessToken, isOnboarded, userId, username }) => {
            setAuth(accessToken, userId, username, isOnboarded);
            navigate("/home", { replace: true });
          },
          onError: (error) => {
            const loginErrorMessage = getLoginErrorMessage(error);

            navigate("/login", { replace: true, state: { loginErrorMessage } });
          },
        },
      );
    };

    exchangeCode();
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

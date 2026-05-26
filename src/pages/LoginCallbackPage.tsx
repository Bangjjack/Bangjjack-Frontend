import { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import type { ApiResponse } from "@/api";
import { ACCESS_TOKEN_KEY } from "@/constants";
import { authQueryKeys, type AuthRegistrationStatus, useExchangeAuthToken } from "@/features/auth";
import { useAuthStore } from "@/stores/authStore";

const DEFAULT_LOGIN_ERROR_MESSAGE = "로그인에 실패했습니다.";

const getAuthRedirectPath = (isOnboarded: boolean) => (isOnboarded ? "/home" : "/onboarding");

const getLoginErrorMessage = (error: unknown) => {
  if (isAxiosError<ApiResponse<null>>(error)) {
    return error.response?.data.message ?? DEFAULT_LOGIN_ERROR_MESSAGE;
  }

  return DEFAULT_LOGIN_ERROR_MESSAGE;
};

export default function LoginCallbackPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const hasExchangedCode = useRef(false);
  const code = searchParams.get("code");
  const setAuth = useAuthStore((state) => state.setAuth);
  const isOnboardingCompleted = useAuthStore((state) => state.isOnboardingCompleted);
  const { mutate: exchangeAuthToken } = useExchangeAuthToken({
    onSuccess: (authSession) => {
      queryClient.setQueryData<AuthRegistrationStatus>(authQueryKeys.registrationStatus(), {
        isChecklistRegistered: authSession.isChecklistRegistered,
        isOnboarded: authSession.isOnboarded,
        isRoommatePreferenceRegistered: authSession.isRoommatePreferenceRegistered,
      });
      setAuth(authSession);
      navigate(getAuthRedirectPath(authSession.isOnboarded), { replace: true });
    },
    onError: (error) => {
      const loginErrorMessage = getLoginErrorMessage(error);

      navigate("/login", { replace: true, state: { loginErrorMessage } });
    },
  });

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      hasExchangedCode.current = true;
      navigate(getAuthRedirectPath(isOnboardingCompleted), { replace: true });
    }
  }, [isOnboardingCompleted, navigate]);

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

      exchangeAuthToken({ code });
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

import { useEffect } from "react";
import { useLocation } from "react-router";
import { Button, toast } from "@/components/ui";
import { BangjjackTitleIcon, GoogleIcon, LogoLoginIcon } from "@/assets/icons";
import { LOGIN_ERROR_MESSAGE_KEY } from "@/constants";
import { getGoogleLoginUrl } from "@/features/auth";

type LoginLocationState = {
  from?: unknown;
  loginErrorMessage?: string;
};

export default function LoginPage() {
  const location = useLocation();
  const locationState = location.state as LoginLocationState | null;
  const redirectFrom = locationState?.from;
  const loginErrorMessage = locationState?.loginErrorMessage;

  const handleGoogleLogin = () => {
    window.location.assign(getGoogleLoginUrl());
  };

  useEffect(() => {
    const storedLoginErrorMessage = sessionStorage.getItem(LOGIN_ERROR_MESSAGE_KEY);

    if (storedLoginErrorMessage) {
      const toastTimer = window.setTimeout(() => {
        sessionStorage.removeItem(LOGIN_ERROR_MESSAGE_KEY);
        toast.error(storedLoginErrorMessage);
      }, 0);

      return () => {
        window.clearTimeout(toastTimer);
      };
    }

    if (loginErrorMessage) {
      const toastTimer = window.setTimeout(() => {
        toast.error(loginErrorMessage);
      }, 0);

      return () => {
        window.clearTimeout(toastTimer);
      };
    }

    if (redirectFrom) {
      const toastTimer = window.setTimeout(() => {
        toast.error("로그인이 필요합니다.");
      }, 0);

      return () => {
        window.clearTimeout(toastTimer);
      };
    }

    return undefined;
  }, [loginErrorMessage, redirectFrom]);

  return (
    <div className="min-h-dvh bg-neutral-50">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-93.75 flex-col px-400">
        <section className="absolute left-1/2 top-[clamp(7rem,23vh,11.6875rem)] flex -translate-x-1/2 flex-col items-center gap-[clamp(1rem,3vh,1.5625rem)]">
          <LogoLoginIcon
            className="h-auto w-[min(63.25vw,14.625rem)]"
            aria-label="방짝 로고 심볼"
            role="img"
          />
          <BangjjackTitleIcon
            className="h-auto w-[min(25.31vw,5.853rem)]"
            aria-label="방짝 타이틀 로고"
            role="img"
          />
        </section>

        <section className="mt-auto pb-[clamp(3rem,13vh,6.8125rem)] mb-12">
          <Button
            type="button"
            variant="neutral"
            className="w-full cursor-pointer border-[1.5px] border-border-strong bg-button-neutral-ghost py-300 text-text-normal"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon className="size-600 shrink-0" />
            <span className="typo-button1">Google 계정으로 로그인</span>
          </Button>
        </section>
      </div>
    </div>
  );
}

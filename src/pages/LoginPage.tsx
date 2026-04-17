import { Button } from "@/components/ui";
import { useNavigate } from "react-router";
import Title from "@/assets/icons/bangjjack-title.svg?react";
import GoogleIcon from "@/assets/icons/google.svg?react";
import LogoLogin from "@/assets/icons/logo-login.svg?react";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-neutral-50">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-93.75 flex-col px-400">
        <section className="absolute left-1/2 top-[clamp(7rem,23vh,11.6875rem)] flex -translate-x-1/2 flex-col items-center gap-[clamp(1rem,3vh,1.5625rem)]">
          <LogoLogin
            className="h-auto w-[min(63.25vw,14.625rem)]"
            aria-label="방짝 로고 심볼"
            role="img"
          />
          <Title
            className="h-auto w-[min(25.31vw,5.853rem)]"
            aria-label="방짝 타이틀 로고"
            role="img"
          />
        </section>

        <section className="mt-auto pb-[clamp(3rem,13vh,6.8125rem)]">
          <Button
            type="button"
            variant="neutral"
            className="w-full cursor-pointer border-[1.5px] border-border-strong bg-button-neutral-ghost py-300 text-text-normal"
            onClick={() => navigate("/onboarding")}
          >
            <GoogleIcon className="size-600 shrink-0" />
            <span className="typo-button1">Google 계정으로 로그인</span>
          </Button>

          <button
            type="button"
            className="mt-[clamp(0.5rem,1.25vh,0.625rem)] w-full cursor-pointer py-100 text-center typo-button2 text-text-alternative"
          >
            회원가입으로 시작하기
          </button>
        </section>
      </div>
    </div>
  );
}

import { useState, type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogIcon,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
  Chip,
  Input,
  toast,
  Tag,
} from "@/components/ui";

/* ── Section wrapper ── */

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-400 rounded-medium border border-border-normal bg-bg-secondary p-500">
      <h2 className="typo-h3 text-text-strong">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-200">
      <p className="typo-caption1 text-text-caption">{label}</p>
      <div className="flex flex-wrap items-center gap-200">{children}</div>
    </div>
  );
}

/* ── Page ── */

export default function DesignSystemPage() {
  const [inputValue, setInputValue] = useState("입력 완료");

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto max-w-[430px] space-y-500 px-500 py-700">
        <header>
          <h1 className="typo-h2 text-text-strong">UI Components</h1>
        </header>

        {/* ── Button ── */}
        <Section title="Button">
          <div className="space-y-300">
            <Row label="variant: default">
              <Button>기본 버튼</Button>
            </Row>
            <Row label="variant: ghost">
              <Button variant="ghost">고스트 버튼</Button>
            </Row>
            <Row label="variant: neutral">
              <Button variant="neutral">뉴트럴 버튼</Button>
            </Row>
            <Row label="variant: black">
              <Button variant="black">블랙 버튼</Button>
            </Row>
            <Row label="variant: black-ghost">
              <Button variant="black-ghost">블랙 고스트 버튼</Button>
            </Row>
            <Row label="disabled">
              <Button disabled>비활성 버튼</Button>
            </Row>
            <Row label="size: sm">
              <Button size="sm" className="">
                작은 버튼
              </Button>
              <Button size="sm" variant="ghost" className="">
                작은 고스트
              </Button>
            </Row>
          </div>
        </Section>

        {/* ── Tag ── */}
        <Section title="Tag">
          <div className="flex flex-wrap gap-200">
            <Tag>기본</Tag>
            <Tag color="gray">회색</Tag>
            <Tag color="mint">민트</Tag>
            <Tag color="black">블랙</Tag>
            <Tag color="pink">핑크</Tag>
            <Tag color="orange">주황</Tag>
            <Tag color="disabled">비활성</Tag>
          </div>
        </Section>

        {/* ── Chip ── */}
        <Section title="Chip (클릭하여 토글)">
          <div className="space-y-300">
            <Row label="single (기본 → 선택)">
              <Chip>라벨</Chip>
            </Row>
            <Row label="multi (선택 시 체크 아이콘)">
              <Chip variant="multi">라벨</Chip>
              <Chip variant="multi">라벨</Chip>
            </Row>
            <Row label="rank (선택 시 순위 뱃지)">
              <Chip variant="rank" rank={1}>
                라벨
              </Chip>
              <Chip variant="rank" rank={2}>
                라벨
              </Chip>
              <Chip variant="rank" rank={3}>
                라벨
              </Chip>
            </Row>
            <Row label="neutral (기본 → 강조)">
              <Chip variant="neutral">라벨</Chip>
              <Chip variant="neutral">라벨</Chip>
            </Row>
          </div>
        </Section>

        {/* ── Input ── */}
        <Section title="Input">
          <div className="space-y-300">
            <Row label="variant: default">
              <Input placeholder="placeholder" />
            </Row>
            <Row label="variant: focused">
              <Input variant="focused" placeholder="입력 중" />
            </Row>
            <Row label="variant: filled (삭제 버튼)">
              <Input
                variant="filled"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onClear={() => setInputValue("")}
              />
            </Row>
            <Row label="variant: error (에러 메시지)">
              <Input variant="error" defaultValue="입력 완료" errorMessage="* 에러 메시지" />
            </Row>
            <Row label="disabled">
              <Input disabled placeholder="입력 불가" />
            </Row>
          </div>
        </Section>

        {/* ── Toast ── */}
        <Section title="Toast">
          <div className="flex flex-wrap gap-200">
            <Button size="sm" className="" onClick={() => toast.success("저장에 성공했어요")}>
              Success 토스트
            </Button>
            <Button
              size="sm"
              variant="black"
              className=""
              onClick={() => toast.error("저장에 실패했어요")}
            >
              Error 토스트
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className=""
              onClick={() => toast.matching("AI 추천순으로 정렬했어요")}
            >
              Matching 토스트
            </Button>
          </div>
        </Section>

        {/* ── AlertDialog ── */}
        <Section title="AlertDialog">
          <div className="space-y-300">
            <Row label="아이콘 + 확인/취소">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" className="">
                    다이얼로그 열기 (아이콘)
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogIcon />
                    <AlertDialogTitle icon>알림 제목</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    알림 설명 텍스트가 여기에 표시됩니다.
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction>확인</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Row>
            <Row label="텍스트만 + 확인/취소">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="ghost" className="">
                    다이얼로그 열기 (텍스트)
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>정말 삭제할까요?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    삭제된 데이터는 복구할 수 없습니다.
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction>삭제</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Row>
          </div>
        </Section>
      </div>
    </div>
  );
}

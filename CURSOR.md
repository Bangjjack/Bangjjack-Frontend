# Bangjjack Frontend — Cursor / AI 가이드

에이전트·기여자용 컨벤션 요약. **불릿·표가 규칙 본문**, 해석이 필요한 항목만 짧은 문장으로 보강한다.

---

## 패키지 매니저

| 규칙 |
|------|
| **pnpm만** 사용 (`npm` / `yarn` 금지) |
| `package.json`의 `packageManager` (`pnpm@9.12.0`) 준수 |

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm format
```

---

## 기술 스택

| 영역 | 선택 |
|------|------|
| UI | React 19 + TypeScript |
| 빌드 | Vite 8 |
| 라우팅 | React Router v7 (`react-router`) |
| 스타일 | Tailwind CSS v4 (`@tailwindcss/vite`), CVA |
| Primitives | Radix UI (`radix-ui`) |
| 패턴 | shadcn/ui (`components.json`, `new-york`, lucide-react) |
| 서버 상태 | TanStack Query |
| 클라이언트 상태 | Zustand |
| HTTP | axios (표준). 인스턴스·인터셉터는 한 곳에서 |
| className | `clsx` + `tailwind-merge` → `@/lib/cn.ts`의 `cn()` |

**부가:** vite-plugin-svgr · @tailwindcss/typography · tw-animate-css (`src/index.css`) · ESLint 9 flat · Prettier · typescript-eslint

---

## React Compiler

- `useMemo` / `useCallback` / `React.memo` **기본 사용 안 함**
- **예외:** 프로파일 등으로 병목이 **확인된 경우**에만 수동 메모

React Compiler는 `vite.config.ts`에서 Babel `reactCompilerPreset()`으로 켜져 있어, 일반적인 최적화는 컴파일러에 맡긴다.

---

## React 19 — `ref`

- `forwardRef` **금지**
- `ref`는 일반 prop으로 받는다
- 발견 시 즉시 일반 함수 컴포넌트 + `ref` prop으로 리팩터

---

## 경로

- `@/` → `src/` (tsconfig `paths` + Vite alias)

---

## 디자인 토큰

| 항목 | 위치 |
|------|------|
| 토큰·글로벌 스타일 | `src/index.css` |
| Tailwind 확장 | `@theme` 블록 |
| 폰트 | Pretendard Variable (`--font-pretendard`) |

- 새 색·간격: **CSS 변수 / `@theme` 우선**, 임의 hex 남발 지양

### 모바일 웹앱 레이아웃 (Figma vs 셸)

| 구분 | 값 |
|------|-----|
| 앱 셸 `#root` | `max-width: var(--width-app-shell)` → **430px** |
| Figma 프레임 | **370px** (`--width-figma-frame`) |

- 피그마는 370 기준, 실행은 최대 430 셸이므로 **페이지 본문은 `layout-figma-frame`**(또는 동일 `min(100%, 370px)` 패턴)으로 중앙 정렬·축소 대응한다.
- **모바일 웹 전용**; 데스크톱 레이아웃은 기본 범위 밖이다.

---

## 컴포넌트

| 경로 | 역할 |
|------|------|
| `src/components/ui/` | 공유 재사용 UI (shadcn 계열) |
| `index.ts` | **배럴 re-export** → `@/components/ui`에서 통일 import |

- 기능·도메인 전용: **`src/features/{기능}/`** (`components/`, `hooks/` 등). `components/` 아래에 `board/`, `auth/` 식 폴더를 두지 않는다.

---

## shadcn · `cn`

- 표준: **`src/lib/cn.ts`**
- `components.json`이 `@/lib/utils`를 가리키면, CLI 생성 후 경로·re-export만 프로젝트에 맞출 것

---

## 데이터 · API

| 용도 | 도구 |
|------|------|
| 서버 상태·캐시·로딩/에러 | TanStack Query |
| 클라이언트 전역(UI·세션 등) | Zustand |
| HTTP | axios |
| 클라이언트 env | `VITE_` 접두사만 |

- `fetch` 래퍼·직접 호출은 남겨두지 말고 **axios + Query** 쪽으로 정리하는 방향

---

## TypeScript

- `tsconfig.base.json`: strict, unused 검사, `noUncheckedIndexedAccess`, `verbatimModuleSyntax` 등 유지
- `any`·우회보다 **명시 타입·좁히기**
- type/interface·import·명명·Tailwind: **`.cursor/rules/code-style.mdc`**

---

## 품질 게이트

- `pnpm lint` · `pnpm typecheck` · `pnpm format:check` 통과
- `eslint-plugin-react-refresh` 준수

---

## 체크리스트

1. pnpm만 썼는가?
2. 토큰/`@theme` 우선인가?
3. `components/ui` + 배럴 export인가?
4. `cn()` 사용인가?
5. 불필요한 memo / `forwardRef` 없는가?
6. Query / Zustand / axios 역할 분리인가?

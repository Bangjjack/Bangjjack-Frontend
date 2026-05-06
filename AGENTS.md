# Bangjjack Frontend — AI Guide

## Core Rules

* pnpm only (npm / yarn 금지)
* API 호출은 반드시 `src/api` 함수 사용 (axios 직접 호출 금지)
* 서버 상태는 TanStack Query로 관리
* 클라이언트 상태는 Zustand (서버 데이터 저장 금지)
* 폼은 React Hook Form + Zod 사용
* `forwardRef` 금지, ref는 prop으로 전달
* 불필요한 memo (`useMemo`, `useCallback`) 사용 금지

---

## Project Structure

* `@/` → `src/`
* 공통 UI → `src/components/ui`
* feature 단위 코드 → `src/features/{feature}`
* API 함수 → `src/api`
* axios 인스턴스 → `src/lib/axios.ts`

---

## Imports

* `@/` alias 사용 (상대경로 지양)
* barrel export 경로 사용
* deep import 금지 (e.g. `"@/components/ui/button"`)

---

## Styling

* Tailwind CSS + design token 사용 (`src/index.css`)
* arbitrary value 지양
* className은 `cn()` (`@/lib/cn.ts`) 사용

---

## Data Layer

| 목적       | 도구             |
| -------- | -------------- |
| 서버 상태    | TanStack Query |
| 클라이언트 상태 | Zustand        |
| HTTP     | axios          |

* fetch 대신 axios 사용
* Query + API 레이어 구조 유지

---

## Query Keys

* queryKey는 반드시 상수로 관리 (`queries/{domain}QueryKeys.ts`)
* 문자열로 직접 작성 금지
* 객체를 queryKey에 사용할 경우 stable 해야 한다

---

## Query Invalidation

* mutation 이후 반드시 관련 query를 invalidate한다

| 상황    | 전략                    |
| ----- | --------------------- |
| 생성/삭제 | lists invalidate      |
| 수정    | detail(id) invalidate |
| 전체 영향 | all invalidate        |

---

## Query Responsibility

* 데이터 후처리 (invalidate 등)는 Query 훅 내부에서 처리
* UI 후처리 (toast, navigation 등)는 컴포넌트에서 처리

---

## Error Handling

* axios 인터셉터 → 공통 HTTP 에러 처리
* TanStack Query → `isError`, `onError` 사용
* `try/catch`로 Query 에러 직접 처리 금지

---

## Zustand

* UI 상태 / 전역 상태만 관리
* 서버 데이터 저장 금지
* Query 데이터를 store로 복사 금지

---

## Forms

* React Hook Form + Zod 사용
* 스키마 기반 validation (inline validate 금지)
* 스키마 위치: `src/features/{feature}/schemas`

---

## Barrel Export

* 각 디렉토리는 `index.ts`를 통해 export를 통합
* 외부에서는 반드시 barrel export 경로로 import

### Pattern

```ts
// src/components/ui/index.ts
export * from "./button";
export * from "./input";
```

---

## Quality Gates

* `pnpm lint`
* `pnpm typecheck`
* `pnpm format:check`

---

## Checklist

1. pnpm 사용 중인가?
2. API를 `src/api` 통해 호출하는가?
3. Query / Zustand 역할 분리했는가?
4. queryKey를 상수로 관리하는가?
5. mutation 후 invalidate 처리했는가?
6. React Hook Form + Zod 사용했는가?
7. 불필요한 memo / forwardRef 없는가?
8. alias import + barrel export 사용했는가?

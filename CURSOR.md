# Bangjjack Frontend — Cursor / AI Guide

A concise convention guide for agents and contributors.  
**Rules are primarily expressed in bullets and tables**, with brief clarifications only where needed.

---

## Package Manager

| Rule |
|------|
| Use **pnpm only** (`npm` / `yarn` are not allowed) |
| Follow the `packageManager` field in `package.json` (`pnpm@9.12.0`) |

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm format
```

---

## Tech Stack

| Area | Choice |
|------|------|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Routing | React Router v7 (`react-router`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`), CVA |
| Primitives | Radix UI (`radix-ui`) |
| Patterns | shadcn/ui (`components.json`, `new-york`, lucide-react) |
| Server State | TanStack Query |
| Client State | Zustand |
| Forms | React Hook Form + Zod |
| HTTP | axios (standard). Centralized instance & interceptors |
| className | `clsx` + `tailwind-merge` → `cn()` in `@/lib/cn.ts` |

**Extras:** vite-plugin-svgr · @tailwindcss/typography · tw-animate-css (`src/index.css`) · ESLint 9 flat · Prettier · typescript-eslint

---

## Forms (React Hook Form + Zod)

- Use **React Hook Form** for all form state management
- Use **Zod** for schema validation
- Integrate via `@hookform/resolvers/zod`
- Validation logic must be **schema-based (Zod)**, not inline

**Guidelines:**

- Define schemas in:
  - `src/features/{feature}/schemas/`
- Reuse schemas between:
  - form validation
  - API request typing (when possible)
- Avoid manual `useState`-based form handling

---

## React Compiler

- Do **not** use `useMemo`, `useCallback`, or `React.memo` by default
- **Exception:** Only use manual memoization when a **confirmed performance bottleneck** exists

The React Compiler is enabled via `reactCompilerPreset()` in `vite.config.ts`.

---

## React 19 — `ref`

- `forwardRef` is **prohibited**
- Accept `ref` as a **regular prop**
- If found, refactor immediately into a standard function component with a `ref` prop

---

## Paths

- `@/` → `src/` (configured via `tsconfig` paths and Vite alias)

---

## Design Tokens

| Item | Location |
|------|------|
| Tokens & global styles | `src/index.css` |
| Tailwind extensions | `@theme` block |
| Font | Pretendard Variable (`--font-pretendard`) |

- Prefer CSS variables / `@theme` over arbitrary values

---

## Components

| Path | Role |
|------|------|
| `src/components/ui/` | Shared reusable UI (shadcn-based) |
| `index.ts` | Barrel re-export |

- Feature/domain-specific code:
  - `src/features/{feature}/`
- Do NOT create `board/`, `auth/` under global components

---

## shadcn · cn

- Use: `src/lib/cn.ts`
- Adjust paths if CLI generates `@/lib/utils`

---

## Data · API

| Purpose | Tool |
|------|------|
| Server state | TanStack Query |
| Client state | Zustand |
| HTTP | axios |
| Env | `VITE_` prefix only |

- Avoid raw `fetch`
- Standardize on axios + Query

---

## TypeScript

- Keep strict settings
- Avoid `any`
- Prefer explicit typing and narrowing
- Follow `.cursor/rules/code-style.mdc`

---

## Quality Gates

- Must pass:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm format:check`

---

## Checklist

1. pnpm only?
2. Using tokens / `@theme`?
3. Using `components/ui`?
4. Using `cn()`?
5. No unnecessary memo / forwardRef?
6. Proper Query / Zustand / axios separation?
7. Using React Hook Form + Zod?
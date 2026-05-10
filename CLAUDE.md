# Bangjjack Frontend — AI Guide

## Core Rules

* pnpm only (npm / yarn prohibited)
* All API calls must go through `src/api` functions (direct axios calls prohibited)
* Server state managed with TanStack Query
* Client state managed with Zustand (storing server data prohibited)
* Forms use React Hook Form + Zod
* `forwardRef` prohibited; pass ref as a prop
* Unnecessary memo (`useMemo`, `useCallback`) usage prohibited

---

## Project Structure

* `@/` → `src/`
* Shared UI → `src/components/ui`
* Feature-level code → `src/features/{feature}`
* API functions → `src/api`
* axios instance → `src/lib/axios.ts`

---

## Imports

* Use `@/` alias (avoid relative paths)
* Use barrel export paths
* Deep imports prohibited (e.g. `"@/components/ui/button"`)

---

## Styling

* Tailwind CSS + design tokens (`src/index.css`)
* Avoid arbitrary values
* Use `cn()` (`@/lib/cn.ts`) for className

---

## Data Layer

| Purpose      | Tool           |
| ------------ | -------------- |
| Server state | TanStack Query |
| Client state | Zustand        |
| HTTP         | axios          |

* Use axios instead of fetch
* Maintain Query + API layer structure

---

## Query Keys

* queryKey must be managed as constants (`queries/{domain}QueryKeys.ts`)
* Inline string usage prohibited
* Objects used as queryKey must be stable

---

## Query Invalidation

* Always invalidate related queries after mutation

| Situation     | Strategy              |
| ------------- | --------------------- |
| Create/Delete | lists invalidate      |
| Update        | detail(id) invalidate |
| Global effect | all invalidate        |

---

## Query Responsibility

* Data post-processing (invalidate, etc.) handled inside Query hooks
* UI post-processing (toast, navigation, etc.) handled in components

---

## Error Handling

* axios interceptor → handle common HTTP errors
* TanStack Query → use `isError`, `onError`
* Directly catching Query errors with `try/catch` is prohibited

---

## Zustand

* Manage UI state / global state only
* Storing server data prohibited
* Copying Query data to store prohibited

---

## Forms

* Use React Hook Form + Zod
* Schema-based validation (inline validate prohibited)
* Schema location: `src/features/{feature}/schemas`

---

## Barrel Export

* Each directory exports through `index.ts`
* External imports must use barrel export paths

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

1. Using pnpm?
2. Calling API through `src/api`?
3. Query / Zustand roles properly separated?
4. queryKey managed as constants?
5. invalidate handled after mutation?
6. Using React Hook Form + Zod?
7. No unnecessary memo / forwardRef?
8. Using alias import + barrel export?

---
name: figma-to-component
description: >-
  Converts Figma frames (URL or screenshot) into React + TypeScript components
  using CVA, Radix/shadcn patterns, and tokens from src/index.css. Use when the
  user shares a Figma link, a design screenshot, or asks to implement or match a
  Figma screen or component.
---

# Figma → Component

Use this skill as **extra guidance when turning Figma into code**. **Global rules** (stack, token locations, `cn`, `components/ui`, React 19, etc.) live in **[CLAUDE.md](../../../CLAUDE.md)** and take precedence.

## 1. Design analysis

Start by clarifying layout, text behavior, and Figma layer order.

| Check                                                    |
| -------------------------------------------------------- |
| Layout: flex / grid, alignment, distribution             |
| Fixed vs content-driven sizing                           |
| Where truncation vs multi-line applies                   |
| Nesting order (e.g. pagination inside vs outside a card) |

Output a **token mapping table** in the format below; align real classes and variables with `src/index.css`.

```text
Figma            | Value / style | Mapped class / token
---------------- | ------------- | --------------------------
Background       | #f7f7f7       | bg-bg-primary
Text             | body 16       | typo-body1 text-text-normal
Heading          | 18 semibold   | typo-title1 text-text-strong
Radius           | 8px           | rounded-small
Padding          | 20px          | p-500
Gap              | 12px          | gap-300
Border           | #e0e0e0       | border-border-normal
```

**Matching order:** Tailwind classes from `@theme` / `@utility` → if missing, `var(--color-…)` (and similar) → if still missing, **propose a new token, get user confirmation**, then add it to `src/index.css`.

## 2. Implementation rules

### DOM · layout

Mirror Figma groups and auto-layout order in the DOM as closely as possible. Avoid wrappers that exist only for spacing; use parent **`gap-*`** for space between siblings.

### Style

Do **not** drive colors or spacing with `style={{ }}`. Use **Tailwind + tokens from `src/index.css`** only.

### Component choice

**Reuse** what already exists, e.g. `@/components/ui/button`, `@/components/ui/input`. Modals/overlays follow **Radix Dialog** (or similar). Card/Badge-style pieces: use `components/ui` if present.

### CVA

Use **`cva`** only when there are real **variant / size / state branches**. For one or two class strings, **`cn()`** is enough.

### Accessibility

Use **semantic elements** for interactive UI (`<button>`, `<a>`). Connect **`<label>`** to inputs. Use `role` only when necessary — do not overuse.

## 3. Building the component

Follow [template.md](template.md). For a new file, confirm **`src/components/ui/index.ts`** exports the component.

**Layout details (Figma alignment)**

- Truncation: `truncate` + **`min-w-0`** on flex/grid children
- Height: use **`h-*`** only when row height must be uniform (e.g. list rows)
- Keep **DOM nesting as close as possible** to the Figma tree

If you use Radix and need **`asChild`**, use the Slot pattern in [template.md](template.md). Add `@radix-ui/react-slot` if it is not installed.

## 4. Wrap-up

```text
✅ File: src/components/ui/ComponentName.tsx
✅ index.ts export: yes/no
✅ Tokens used: (list)
⚠️  New token: — user confirmed: y/n
```

**Self-check**

- [ ] Token mapping matches `index.css`
- [ ] No hard-coded values or inline styles; tokens only
- [ ] DOM matches Figma structure and overflow behavior (`min-w-0`, `truncate`)
- [ ] [CLAUDE.md](../../../CLAUDE.md) global rules respected

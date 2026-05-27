---
name: commit
description: >-
  Analyzes staged git changes and proposes split commit messages with
  conventional commit prefixes. Use when the user wants to commit staged
  changes, write commit messages, or split changes into logical commit units.
---

# Commit Message Writer

Commit messages are written as **a single line, concisely**.
Do not include Claude in the author list (no Co-Authored-By).

---

## Step 1. Check staged changes

```bash
git diff --staged --stat
git diff --staged
```

If there are no staged changes, notify the user and stop.

---

## Step 2. Split into logical units

When staged changes span multiple concerns, **group files by logical unit**.

Grouping rules:
- Same feature (e.g. component + hook + API function for one feature → one commit)
- Refactor / move / rename (separate from behavior changes)
- Type / interface changes (can be bundled with related implementation)
- Style / format-only changes (separate from behavior changes)
- Dependency or config file changes (separate commit)

---

## Step 3. Choose a prefix

| Prefix | When to use |
|--------|-------------|
| `feat` | New feature, screen, component, or API integration |
| `fix` | Bug fix or incorrect behavior correction |
| `refactor` | Structure improvement, move, or rename with no behavior change |
| `style` | Code format, whitespace, semicolons — no behavior change |
| `chore` | Build config, packages, env vars, CI — outside business logic |
| `docs` | README, comments, documentation only |
| `test` | Adding or modifying test code |
| `perf` | Performance improvement |
| `build` | Build system or external dependency changes (webpack, vite, etc.) |
| `ci` | CI/CD pipeline changes |
| `revert` | Reverting a previous commit |

---

## Step 4. Commit message rules

- **Format:** `<prefix>: <summary of change>`
- **Length:** single line, 72 characters or fewer
- **Language:** Korean (noun-ending style; avoid "했다" / "합니다" sentence endings)
- **Content:** state clearly *what* was done; omit *how*

**Good examples:**
```
feat: 온보딩 미완료 사용자 AI 추천글 접근 제한 처리
fix: ChecklistRequiredDialog \n 이스케이프 미적용 오류 수정
refactor: ChecklistRequiredDialog를 onboarding 도메인으로 이동
```

**Bad examples:**
```
feat: 기능 추가했습니다
update: 수정
fix: bug fix
```

---

## Step 5. Output and execute

Print each proposed commit unit:

```
Commit 1: <prefix>: <message>
  Files: src/..., src/...

Commit 2: <prefix>: <message>
  Files: src/..., src/...
```

After the user approves, execute each unit in order with `git add` + `git commit`.

Do **not** include `Co-Authored-By` in any commit.

```bash
git add <file1> <file2>
git commit -m "<commit message>"
```

---

## Constraints

- Never stage or commit `.env`, secrets, or credential files.
- Never use `git add .` / `git add -A` — always list files explicitly.
- Never use `--no-verify` (do not bypass pre-commit hooks).
- Only analyze already-staged changes (`git diff --staged`).
- Do not include unstaged files.

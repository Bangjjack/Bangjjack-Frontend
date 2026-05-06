---
name: pr-writer
description: >-
  Analyzes git changes and generates a PR body following
  .github/pull_request_template.md. Use for PR creation, drafting a PR
  description, or updating an existing PR after new commits.
---

# PR Writer

The final body must follow **[.github/pull_request_template.md](../../../.github/pull_request_template.md)** exactly: **section titles, order, and checkbox labels**. You may use [template.md](template.md) as the same skeleton. Do not add sections that are not in the template.

**Language:** Section headings and checkbox text stay as in the template (Korean). Fill **작업사항**, **기타사항**, etc. in **Korean** unless the user asks otherwise.

## Step 1. Analyze changes

Collect diffs against the default branch.

```bash
# Default branch (origin HEAD). If sed is missing: git rev-parse --abbrev-ref origin/HEAD | sed 's|origin/||'
BASE_BRANCH=$(git remote show origin 2>/dev/null | sed -n '/HEAD branch/s/.*: //p')
[ -z "$BASE_BRANCH" ] && BASE_BRANCH=$(git rev-parse --abbrev-ref origin/HEAD 2>/dev/null | sed 's|origin/||')
[ -z "$BASE_BRANCH" ] && BASE_BRANCH="main"

git diff "origin/${BASE_BRANCH}"...HEAD --stat
git log "origin/${BASE_BRANCH}"...HEAD --oneline
git diff "origin/${BASE_BRANCH}"...HEAD
```

On Windows PowerShell without bash, use an explicit default branch (e.g. `git diff origin/main...HEAD`) or ask the user for `main` vs `master`.

## Step 2. Extract issue number from the branch name

```bash
git branch --show-current
```

Example: `feat/WTH-42-button-component` → issue **#42** (parse ticket prefixes per team rules). If there is no number, set **관련 이슈** to `없음` / `N/A` / equivalent.

## Step 3. Choose PR type

Map the diff to the template checkboxes. **Use the exact Korean labels** from 🗒️ PR 타입.

| Nature of change | Check this (🗒️ PR type) |
|------------------|-------------------------|
| New feature, screen, API integration, etc. | **기능 추가** |
| Removed feature / screen / domain | **기능 삭제** |
| Bug or incorrect behavior fix | **버그 수정** |
| Refactor, rename, structure (behavior unchanged) | **코드 리팩토링** |
| Comments only, format only, rename-only vars (same behavior) | Usually **코드 리팩토링**; if unclear, explain under **기타사항** |
| README, `*.md`, doc-heavy edits | **문서 수정** |
| `package.json`, lockfile, CI, env, build config | **의존성, 환경 변수, 빌드 관련 코드 업데이트** |
| File/folder move or rename only | **코드 리팩토링** (or delete+add if that fits better) |
| File/folder deletion (feature shrink) | **기능 삭제** or **코드 리팩토링** (pick by context) |

Check `[x]` only for applicable items; leave others `[ ]`. Multiple selections are allowed.

## Step 4. Output

1. **Suggested PR title** (one line), e.g. `feat: add OO`, `fix: XX bug`.
2. **Full body**: complete markdown filled from [template.md](template.md), in one copy-paste block.

Fill each section:

- **🔗 관련 이슈:** If Step 2 yielded a number, use `close #42`. Otherwise `- 없음` or similar.
- **📌 작업사항:** Bullets as **full sentences** (what, why, where).
- **📸 스크린샷:** If UI changed, add guidance; if not, e.g. `UI 변경 없음`. A **placeholder** for the user to attach images is fine.
- **📣 기타사항:** Risks, questions, follow-ups; if none, short `없음`.
- **✅ 체크리스트:** Copy verbatim from the template. Keep `[ ]` for items the agent cannot verify; set `[x]` only when the user confirms (e.g. build done).

Quality: prose should read well in **Korean**. If something conflicts with [CLAUDE.md](../../../CLAUDE.md), mention it under **기타사항**.

## Step 5. Update an existing PR (after more commits)

Replace the PR description but **append** only the new work under the previous **📌 작업사항**.

```bash
LAST_PUSH=$(git rev-parse @{push} 2>/dev/null || git rev-parse "origin/$(git branch --show-current)" 2>/dev/null || echo "HEAD")
git diff "${LAST_PUSH}" --stat
git log "${LAST_PUSH}"..HEAD --oneline
git diff "${LAST_PUSH}"
```

If `origin/<branch>` is missing or `LAST_PUSH` is useless, run `git fetch` and retry, or ask the user for the **comparison ref**. Goal: summarize commits **since the last push**.

Append below **📌 작업사항** with a heading (2nd push, 3rd push, …):

```markdown
#### 🔄 추가 변경사항 (2차)

- change 1
- change 2
```

- If the change type shifted, update **🗒️ PR 타입** checkboxes.
- Refresh **📸 스크린샷** / **📣 기타사항** if needed.

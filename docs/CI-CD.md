# CI/CD guide

How our code goes from a branch to production, and what checks it on the way.

## The big picture

```
feat/* ──PR──► dev ──PR──► main
   │            │            │
 Vercel       Vercel       Vercel
 Preview      Preview      Production
```

- **CI** (GitHub Actions) checks the code on every pull request and on every push to `dev` and `main`.
- **CD** (Vercel, native GitHub integration) deploys automatically:
  - any branch → a **Preview** URL (posted on the PR),
  - `main` → **Production**.
- Merging into `main` = going live. That is why `main` is the most protected branch.
- The domain `womanofpower.org` (Infomaniak) is **not** switched to Vercel yet. Production lives on the `*.vercel.app` URL until we decide to switch the DNS.

## What the CI checks

File: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml). Two jobs run in parallel:

| Job | Step | Catches |
|---|---|---|
| `verify` | `npm ci` | `package.json` and `package-lock.json` out of sync |
| | `npm run lint` | ESLint errors |
| | `npm run typecheck` | TypeScript errors |
| | `npm run build` | The app does not compile |
| `security` | `npm audit --omit=dev --audit-level=high` | High/critical vulnerabilities in production dependencies |
| | `NEXT_PUBLIC_` guard | A secret key exposed to the browser |
| | Branch name and PR title | Names that break our conventions |

The CI uses **no secrets**: the app builds without environment variables (the forms simply show "not enabled yet").

## Run the checks locally before pushing

Same Node version as the CI (see [`.nvmrc`](../.nvmrc)):

```bash
node -v              # must match .nvmrc
npm ci               # clean install from the lockfile
npm run lint
npm run typecheck
npm run build
```

If these pass locally, the CI will pass too.

## Tests

There are **no automated tests yet**. Next step: Vitest for the business rules (contact form validation, newsletter double opt-in, `escapeHtml`), then a `npm test` step in `verify`.

## Branch rules

| | `dev` | `main` |
|---|---|---|
| Pull request required | Yes | Yes |
| Approvals required | **0**: you can merge your own PR (asking for a review is optional) | **1**: the other developer approves |
| CI must pass (`verify`, `security`) | Yes | Yes |
| Merge method | **Squash** | **Merge commit** |
| Force push / delete | Blocked | Blocked |

Why a PR on `dev` even without review? So the CI runs **before** the code reaches `dev`, and `dev` never breaks for the other person.

## Conventions

**Branches**, always created from `dev`:

```
feat/<name>   fix/<name>   chore/<name>   docs/<name>
refactor/<name>   test/<name>   hotfix/<name> (from main)
```

Lowercase letters, digits, `-`, `_` and `.` only. Example: `feat/newsletter-form`.

**PR titles** (they become the commit message on `dev` after a squash):

```
feat: add the newsletter form
fix(contact): handle Supabase timeout
chore: | refactor: | docs: | test: | release: (dev → main)
```

## Daily workflow

```bash
git switch dev && git pull
git switch -c feat/my-feature
# ...work, commit...
git push -u origin feat/my-feature
```

1. Open a PR to `dev` (a **draft** PR early is fine: the CI runs on each push).
2. Wait for the green CI, check the Vercel Preview link.
3. Merge (squash). Request a review if you want a second pair of eyes.

**Release**: open a PR `dev → main` titled `release: …`. The other developer approves it, then merge it: Vercel deploys to production.

## When the CI fails

1. On the PR, click **Details** next to the red check.
2. Open the red step: the error is at the end of the log.
3. Reproduce locally with the same command (table above), fix it, push again. The previous run is cancelled automatically.

Common cases:

| Error | Fix |
|---|---|
| `npm ci` fails: lockfile out of sync | Run `npm install` with the Node version from `.nvmrc`, commit `package-lock.json` |
| `npm audit` fails | Update the package (`npm update <pkg>`), or check the advisory if no fix exists yet |
| Branch name or PR title rejected | Rename the PR title on GitHub; for the branch, push it again under a valid name |

Never disable a check to make the CI pass.

## Hotfix (urgent production fix)

```bash
git switch main && git pull
git switch -c hotfix/short-description
# fix, commit, push
```

1. PR `hotfix/*` → `main`, approved by the other developer, merged.
2. Right after: PR `main → dev`, so `dev` gets the fix too.

## Rollback

1. **Immediately**: Vercel → Deployments → previous production deployment → **Instant Rollback**. The site is back in seconds.
2. **Then**: revert the faulty change in Git (`git revert <commit>` on a `hotfix/*` branch, PR to `main`), so `main` matches production again.

## Secrets

- Secrets live **only** in `.env.local` (never committed) and in Vercel → Settings → Environment Variables.
- Never prefix a server key with `NEXT_PUBLIC_`: it would be sent to every visitor. `SUPABASE_SERVICE_ROLE_KEY` gives full database access.
- If a secret is ever committed: **revoke it first** (Supabase / Resend dashboard), then remove it from the code. Deleting the commit is not enough on a public repository.

## Coming next

- Vitest tests in the CI.
- Separate Supabase staging project, versioned migrations and RLS tests.
- Emails redirected to a test inbox outside production.
- Playwright end-to-end tests on the main user journeys.

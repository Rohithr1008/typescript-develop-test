# 📌 Project Handoff — TypeScript Develop + Test

> **Purpose:** Fresh session (human or AI) knows Phase B is **built**, what each part covers, and what not to duplicate.

---

## 1. Status

| | |
|---|---|
| **Status** | ✅ **Built** — Parts 1–3 shipped (three editions each) + runnable lab + CI |
| **Curriculum** | Deeper TS → TaskBoard app → Playwright in TS |
| **Repo** | https://github.com/Rohithr1008/typescript-develop-test |
| **Path** | `C:\Users\rohit\.cline\data\workspaces\chat\typescript-develop-test` |

Do **not** expand into a full React bootcamp or second Playwright course. Link siblings instead.

---

## 2. Project overview

Phase B kit: **deeper TypeScript → small TS app → Playwright in TypeScript → CI**.

| Part | Focus | Lab tie-in |
|---|---|---|
| 1 | Deeper TypeScript (beyond thin tester kit) | Types used in `src/types.ts` |
| 2 | TaskBoard Express + vanilla UI | `npm start` on port 3847 |
| 3 | Playwright in TypeScript + GitHub Actions | `npm test` · `.github/workflows/ci.yml` |

**Pedagogy:** same family as JE / Playwright — three editions, ADHD/autistic-friendly chunks, why-it-matters.

### Automation Tester Path

| | |
|---|---|
| Umbrella | [`../automation-tester-path/README.md`](../automation-tester-path/README.md) · [`ROADMAP`](../automation-tester-path/ROADMAP.md) |
| Phase | **B** (develop + test) — step 7 |
| Previous | HTML & CSS Parts 2–3; Phase A thin TS is **not** a substitute |
| Sibling (thin TS) | [`../typescript-for-testers/`](../typescript-for-testers/) |
| Not this kit | Full HTML/CSS curriculum · thin TS-only · Playwright pedagogy dump |

---

## 3. What's in the repo

### Study materials (offline)

| Part | Plain | Interactive | Study app | Context |
|---|---|---|---|---|
| 1 | `Typescript_develop_test_part1_with_examples.md` | `_interactive.md` | `_study_app.html` | `TYPESCRIPT_DEVELOP_TEST_PART1_CONTEXT.md` |
| 2 | `_part2_*` | same pattern | same pattern | `PART2_CONTEXT.md` |
| 3 | `_part3_*` | same pattern | same pattern | `PART3_CONTEXT.md` |

Hub: `index.html` · entry: `START_HERE.md` · plans: `PART1_PLAN.md` … `PART3_PLAN.md`

### Runnable lab

| Piece | Location |
|---|---|
| Types / store / auth | `src/types.ts`, `store.ts`, `auth.ts`, `seed.ts` |
| Express server | `src/server.ts` |
| Vanilla UI | `src/public/index.html`, `app.js` |
| Playwright config | `playwright.config.ts` |
| E2E | `tests/e2e/board.spec.ts` |
| API | `tests/api/tasks.api.spec.ts` |
| Helper | `tests/helpers/board.ts` |
| CI | `.github/workflows/ci.yml` |

Seed users: `alice / alice123` · `bob / bob123` · port `3847`

---

## 4. Commands

```bash
npm install
npx playwright install chromium
npm start              # dev server
npm run build          # tsc + copy public
npm test               # Playwright (webServer starts app)
npm run test:report
```

---

## 5. Rules for agents

1. Keep thin TS vs Phase B distinction in any path copy.  
2. Do not re-teach Playwright strategy — link [`../playwright-essentials/`](../playwright-essentials/).  
3. Naming: `Typescript_develop_test_partN_{with_examples,interactive,study_app}.html`  
4. CI pattern mirrors [`../automation-portfolio/`](../automation-portfolio/) — HTML report artifact upload.

---

_Built Phase B kit. Status: BUILT._

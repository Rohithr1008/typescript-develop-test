# 📌 Project Handoff — TypeScript Develop + Test

> **Purpose:** Fresh session (human or AI) knows Phase B is **built**, what each part covers, and how to run the app/tests.

---

## 1. Status

| | |
|---|---|
| **Status** | ✅ **BUILT** |
| **Parts** | 3 (deeper TS · TaskBoard app · Playwright TS + CI) |
| **Repo** | https://github.com/Rohithr1008/typescript-develop-test |
| **Path** | `C:\Users\rohit\.cline\data\workspaces\chat\typescript-develop-test` |

Coordinate with [`../automation-tester-path/ROADMAP.md`](../automation-tester-path/ROADMAP.md).

---

## 2. Project overview

Phase B kit: **deeper TypeScript → small TS app → Playwright in TypeScript → CI**.

| Part | Focus |
|---|---|
| 1 | Deeper TypeScript (modules, async, generics, strict tsconfig, API unions) |
| 2 | TaskBoard mini-app (Express + TS, Bearer auth, typed CRUD, vanilla UI) |
| 3 | Playwright in TypeScript (E2E + API tests, HTML report, GitHub Actions) |

**Pedagogy:** three editions per part, ADHD/autistic-friendly chunks, why-it-matters, progress + certificate in study apps.

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

| Area | Location |
|---|---|
| Hub | `index.html` |
| Study apps | `Typescript_develop_test_partN_study_app.html` |
| Markdown editions | `Typescript_develop_test_partN_{with_examples,interactive}.md` |
| Context notes | `TYPESCRIPT_DEVELOP_TEST_PARTN_CONTEXT.md` |
| App source | `src/` (types, store, seed, auth, server, public) |
| Tests | `tests/api/`, `tests/e2e/`, `tests/helpers/board.ts` |
| Playwright config | `playwright.config.ts` |
| CI | `.github/workflows/ci.yml` |

---

## 4. Commands

```bash
npm install
npm start              # TaskBoard at http://localhost:3847
npm run build          # tsc + copy public
npm test               # Playwright (8 tests)
npm run test:report    # open HTML report
```

Seed: `alice / alice123` · `bob / bob123`

---

## 5. Naming & conventions

| File | Role |
|---|---|
| `Typescript_develop_test_partN_with_examples.md` | Plain |
| `Typescript_develop_test_partN_interactive.md` | Interactive MD |
| `Typescript_develop_test_partN_study_app.html` | Study app |
| `PARTN_PLAN.md` | Plan |
| `TYPESCRIPT_DEVELOP_TEST_PARTN_CONTEXT.md` | Context |

Study-app localStorage: `tdtN-sec-K`, `tdtN-theme`, `tdtN-font`.  
Sentinels: `<!--PN-END-->`, `<!--PNI-END-->`, `<!--PNH-END-->`.

**Study apps (lite):** ~100 lines each vs 400+ in sibling kits — progress bar, quizzes, theme, font size, focus mode, skip link. No XP/streak/flashcard panels (see `typescript-for-testers` for full shell).

---

## 6. Rules for agents

1. Thin TS kit ≠ this kit — keep the distinction in any path copy.  
2. Do not re-teach Playwright pedagogy here — link to `playwright-essentials`.  
3. Part 2 app is the test target for Part 3 — keep seed deterministic (`POST /api/reset`).  

---

_Built Phase B kit. Status: BUILT._

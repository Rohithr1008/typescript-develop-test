# TypeScript Develop + Test

**Status:** ✅ **Built** — Phase B kit on the [Automation Tester Path](../automation-tester-path/README.md).

For learners who finished **Phase A** (JE → HTML/CSS Part 1 → thin TS → Playwright → harden/API/perf/portfolio) and want **develop + test** depth in TypeScript — not the thin “types for test code” kit alone.

**Path map:** [`../automation-tester-path/README.md`](../automation-tester-path/README.md) · [`ROADMAP`](../automation-tester-path/ROADMAP.md) · [`START_HERE` (path)](../automation-tester-path/START_HERE.md)  
**This kit:** [`START_HERE.md`](START_HERE.md) · [`HANDOFF.md`](HANDOFF.md) · **Hub:** [`index.html`](index.html)

---

## Phase B role

| | |
|---|---|
| **On the path** | Phase B step 7 — after HTML/CSS Parts 2–3; deeper than [TypeScript for Testers](../typescript-for-testers/) |
| **Previous** | [HTML & CSS Essentials](../html-css-essentials/) Parts 2–3 (deeper FE) · Phase A thin TS ≠ enough |
| **Not this kit** | Thin test-oriented TS → `typescript-for-testers` · Browser E2E pedagogy → [Playwright Essentials](../playwright-essentials/README.md) |
| **Goal** | Ship a small TS app with Playwright (TS) + CI — develop+test literacy |
| **Phase C (next, STUB)** | [React Essentials](../react-essentials/) — components, hooks light, styling |

---

## Parts (3 × three editions)

| Part | Focus | Study app |
|---|---|---|
| **1** | Deeper TypeScript | [Open](Typescript_develop_test_part1_study_app.html) |
| **2** | TaskBoard mini-app | [Open](Typescript_develop_test_part2_study_app.html) |
| **3** | Playwright in TypeScript + CI | [Open](Typescript_develop_test_part3_study_app.html) |

Each part ships three editions:

| Edition | Best for | Part 1 | Part 2 | Part 3 |
|---|---|---|---|---|
| Study app | Offline browser — progress, quizzes, certificate | [App](Typescript_develop_test_part1_study_app.html) | [App](Typescript_develop_test_part2_study_app.html) | [App](Typescript_develop_test_part3_study_app.html) |
| Interactive Markdown | VS Code preview (`Ctrl+Shift+V`) | [MD](Typescript_develop_test_part1_interactive.md) | [MD](Typescript_develop_test_part2_interactive.md) | [MD](Typescript_develop_test_part3_interactive.md) |
| Plain Markdown | Print / PDF / distraction-free | [Plain](Typescript_develop_test_part1_with_examples.md) | [Plain](Typescript_develop_test_part2_with_examples.md) | [Plain](Typescript_develop_test_part3_with_examples.md) |

---

## Runnable TaskBoard (Part 2)

```bash
git clone https://github.com/Rohithr1008/typescript-develop-test.git
cd typescript-develop-test
npm install
npm start          # http://localhost:3847
```

Seed logins: `alice / alice123` · `bob / bob123`

---

## Playwright tests (Part 3)

```bash
npm test                 # starts app + runs 8 tests (API + E2E)
npm run test:report      # open HTML report locally
npm run build            # tsc + copy public → dist
```

CI: `.github/workflows/ci.yml` — build + Playwright on push/PR, uploads `playwright-report` artifact.

---

## Hub files

| File | Purpose |
|---|---|
| [`START_HERE.md`](START_HERE.md) | First open |
| [`HANDOFF.md`](HANDOFF.md) | Conventions for humans/agents |
| [`PART1_PLAN.md`](PART1_PLAN.md) / [`PART2_PLAN.md`](PART2_PLAN.md) / [`PART3_PLAN.md`](PART3_PLAN.md) | Section plans |
| [`index.html`](index.html) | Offline hub |

---

### 🧭 What's next (Phase C)

After this kit (and optionally [CSS Advanced](../css-advanced/)):

→ **[React Essentials](../react-essentials/)** (STUB) — React basics, hooks light, CSS Modules / Tailwind · [`automation-tester-path` Phase C](../automation-tester-path/ROADMAP.md)

---

*Phase B complete — deeper TS, real app, typed Playwright tests, CI. Thin TS for automation hire path → [`typescript-for-testers`](../typescript-for-testers/).*

# TypeScript Develop + Test — Part 3: Test What You Built

Playwright **in TypeScript** against the Part 2 TaskBoard: E2E + API tests, typed helper, HTML reporter, GitHub Actions.

> 💡 Plain edition. Interactive: `Typescript_develop_test_part3_interactive.md`. Study app: `Typescript_develop_test_part3_study_app.html`.

---

### 🗺 Your path

```
Part 2 TaskBoard → Part 3 tests + CI (you are here)
```

**Do not re-learn everything here** — use siblings:

| Need | Kit |
|---|---|
| Thin types for helpers | [`../typescript-for-testers`](../typescript-for-testers/) |
| E2E strategy, flakes, deep POM | [`../playwright-essentials`](../playwright-essentials/) |
| Packaging demos for hire | [`../automation-portfolio`](../automation-portfolio/) |

---

## Table of Contents

1. [Develop + test loop](#1-develop--test-loop)
2. [Link map](#2-link-map)
3. [Config + webServer](#3-config--webserver)
4. [API request tests](#4-api-request-tests)
5. [E2E + typed page helper](#5-e2e--typed-page-helper)
6. [HTML reporter](#6-html-reporter)
7. [GitHub Actions CI](#7-github-actions-ci)
8. [Practice & next](#8-practice--next)

---

## 1. Develop + test loop

> 🚩 **Why it matters:** the same repo owns the app *and* the proof it works.

```
change types/routes → npm start (manual) → npm test (auto) → push → CI artifact
```

Reset seed before each test so order doesn’t flake. Assert on `ApiResult` discriminants and visible UI.

### 🧪 Quiz

1. Who starts the app during `npm test`? **Answer:** Playwright `webServer` (`npm start`).  
2. Why `beforeEach` reset? **Answer:** Deterministic state; no cross-test pollution.

---

## 2. Link map

You already practiced Playwright pedagogy elsewhere. This part only wires **TS tests to *your* app**.

```
typescript-for-testers  →  annotate helpers
playwright-essentials   →  when/how to E2E
typescript-develop-test →  app + TS tests + CI (here)
automation-portfolio    →  show a green pipeline
```

### 🧪 Quiz

1. Where is deep flake strategy taught? **Answer:** Playwright Essentials.  
2. Is this kit a React bootcamp? **Answer:** No.

---

## 3. Config + webServer

`playwright.config.ts`:

- `testDir: ./tests`  
- `reporter: list + html`  
- `webServer.command: npm start`  
- `webServer.url: /api/health`  
- `workers: 1` (shared in-memory store)

### 🧪 Quiz

1. Health URL purpose? **Answer:** Wait until server is ready.  
2. Why one worker? **Answer:** In-memory store isn’t multi-process safe.

---

## 4. API request tests

`tests/api/tasks.api.spec.ts` uses `request` fixture:

- health + seed counts  
- bad login → `code: BAD_CREDENTIALS`  
- CRUD with Bearer token  
- Bob cannot see Alice’s tasks  

Helper: `apiLogin` / `apiReset` in `tests/helpers/board.ts`.

### 🧪 Quiz

1. How many Alice tasks after seed? **Answer:** 3.  
2. HTTP status for bad password? **Answer:** 401.

---

## 5. E2E + typed page helper

```ts
export class BoardPage {
  constructor(readonly page: Page) {}
  async login(username: string, password: string): Promise<void> { /* … */ }
  async addTask(title: string): Promise<void> { /* … */ }
}
```

E2E covers: login + seed visibility, add/move, delete, bad password error. Light POM — not a framework.

### 🧪 Quiz

1. Locator for login submit? **Answer:** `#loginBtn`.  
2. Is `BoardPage` required by Playwright? **Answer:** No — a typed helper habit.

---

## 6. HTML reporter

```bash
npm test
npm run test:report   # playwright show-report
```

CI uploads `playwright-report/` as an artifact (even on success in this kit — easier classroom review).

### 🧪 Quiz

1. Folder for HTML report? **Answer:** `playwright-report/`.  
2. Local command to open it? **Answer:** `npm run test:report`.

---

## 7. GitHub Actions CI

`.github/workflows/ci.yml`:

1. `npm ci`  
2. `npm run build`  
3. `npx playwright install --with-deps chromium`  
4. `npm test`  
5. Upload `playwright-report` artifact  

### 🧪 Quiz

1. Does CI typecheck? **Answer:** Yes — via `npm run build`.  
2. Browser installed how? **Answer:** `playwright install --with-deps chromium`.

---

## 8. Practice & next

```bash
npm test
```

1. Break a seed title intentionally — watch E2E fail.  
2. Restore title — green again.  
3. Open the HTML report.  
4. Optional: push and download the CI artifact.

**Next on the path:** deepen FE via HTML/CSS Parts 2–3 if needed · show work in [`automation-portfolio`](../automation-portfolio/) · keep using Playwright Essentials for advanced E2E topics.

<!--P3-END-->

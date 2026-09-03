# TypeScript Develop + Test — Part 2: Small App (TaskBoard)

Ship and understand a **real runnable** Express + TypeScript API with a vanilla UI: auth, typed CRUD, deterministic seed.

> 💡 Plain edition. Interactive: `Typescript_develop_test_part2_interactive.md`. Study app: `Typescript_develop_test_part2_study_app.html`.

---

### 🗺 Your path

```
Part 1 deeper TS → Part 2 app (you are here) → Part 3 Playwright TS + CI
```

**Run the app (not study-app-only):**

```bash
npm install
npm start
# open http://localhost:3847
# alice / alice123   or   bob / bob123
```

---

## Table of Contents

1. [Why a tiny real app](#1-why-a-tiny-real-app)
2. [Layout & tsconfig](#2-layout--tsconfig)
3. [Domain types & API unions](#3-domain-types--api-unions)
4. [Auth + CRUD routes](#4-auth--crud-routes)
5. [Deterministic seed](#5-deterministic-seed)
6. [Vanilla UI ↔ API](#6-vanilla-ui--api)
7. [Run / build checklist](#7-run--build-checklist)
8. [Practice → Part 3](#8-practice--part-3)

---

## 1. Why a tiny real app

> 🚩 **Why it matters:** reading types ≠ shipping. A small TaskBoard gives you something Playwright can hit.

| Choice | Why |
|---|---|
| Express + TS | Familiar HTTP surface, easy to type |
| In-memory store | No DB install; resets cleanly for tests |
| Vanilla UI | No React/Next overbuild |
| Bearer token auth | Real enough for “protected CRUD” |

Out of scope: production password hashing, React, Mongo — JE Parts 4–5 cover that path.

### 🧪 Quiz

1. Default port? **Answer:** `3847`.  
2. Why in-memory? **Answer:** Simple demos + deterministic Playwright resets.

---

## 2. Layout & tsconfig

```
src/
  types.ts      # Task, Session, ApiResult<T>
  store.ts      # Map-based store
  seed.ts       # fixed users + tasks
  auth.ts       # requireAuth middleware
  server.ts     # Express routes
  public/       # index.html + app.js
```

Strict `tsconfig` from Part 1 drives the server. `npm run build` runs `tsc` then copies `public` → `dist/public`.

### 🧪 Quiz

1. Where do routes live? **Answer:** `src/server.ts`.  
2. Does `tsc` alone copy HTML? **Answer:** No — `scripts/copy-public.mjs` does.

---

## 3. Domain types & API unions

```ts
export type TaskStatus = "todo" | "doing" | "done";
export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; error: string; code: string };
export type ApiResult<T> = ApiOk<T> | ApiErr;
```

Every JSON response is an `ApiResult`. UI and tests branch on `ok`.

### 🧪 Quiz

1. Discriminant field? **Answer:** `ok`.  
2. Allowed statuses? **Answer:** `todo`, `doing`, `done`.

---

## 4. Auth + CRUD routes

| Method | Path | Auth | Role |
|---|---|---|---|
| POST | `/api/login` | no | issue Bearer token |
| POST | `/api/logout` | yes | drop session |
| GET | `/api/me` | yes | current user |
| GET/POST | `/api/tasks` | yes | list / create |
| PATCH/DELETE | `/api/tasks/:id` | yes | update / delete |
| POST | `/api/reset` | no | restore seed (demo/tests) |
| GET | `/api/health` | no | liveness |

`requireAuth` reads `Authorization: Bearer …` and attaches `session`. Tasks are **owner-scoped** — Alice never sees Bob’s cards.

### 🧪 Quiz

1. Header for auth? **Answer:** `Authorization: Bearer <token>`.  
2. Can Bob list Alice’s tasks? **Answer:** No — filtered by `ownerId`.

---

## 5. Deterministic seed

`seed.ts` always creates:

- Users: alice, bob (fixed passwords)  
- Alice: 3 tasks · Bob: 1 task  
- Fixed timestamps for stable assertions  

`POST /api/reset` calls `seedStore()` again — Part 3 tests call this in `beforeEach`.

### 🧪 Quiz

1. How many tasks after seed? **Answer:** 4 total.  
2. Why fixed IDs/titles? **Answer:** Predictable E2E/API assertions.

---

## 6. Vanilla UI ↔ API

`public/app.js` stores the token in `localStorage`, sends Bearer on each call, renders three columns (todo/doing/done). No framework — easier to test with Playwright locators (`#loginBtn`, `.task`, etc.).

### 🧪 Quiz

1. Where is the token kept in the browser? **Answer:** `localStorage` (`taskboard_token`).  
2. Which button adds a task? **Answer:** `#addBtn`.

---

## 7. Run / build checklist

```bash
npm install
npm start              # tsx src/server.ts
npm run build          # tsc + copy public
npm run start:dist     # node dist/server.js  (after build)
```

Health check: `GET /api/health` → `{ ok: true, data: { status: "up", … } }`.

### 🧪 Quiz

1. Dev runner? **Answer:** `tsx` via `npm start`.  
2. CI also builds? **Answer:** Yes — see Part 3 workflow.

---

## 8. Practice → Part 3

1. Log in as alice, add a task, move it to **Doing**.  
2. Log in as bob — confirm you only see Bob’s seed task.  
3. Call `POST /api/reset` then log in again.  
4. Open Part 3 and run `npm test`.

**Next:** Part 3 — Playwright in TypeScript against this app.  
Links: [Playwright Essentials](../playwright-essentials/) (strategy) · [automation-portfolio](../automation-portfolio/) (show work)

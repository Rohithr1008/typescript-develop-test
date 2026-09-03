# TypeScript Develop + Test — Part 1: Deeper TypeScript

Beyond the thin testers kit: **modules, async typing, light generics/utilities, strict tsconfig, discriminated unions, error typing**.

> 💡 **Plain edition:** open Q&A. Interactive: `Typescript_develop_test_part1_interactive.md`. Study app: `Typescript_develop_test_part1_study_app.html`.

---

### 🗺 Your path

```
Phase A thin TS (typescript-for-testers) → Playwright Essentials
        ↓
Phase B: Part 1 (you are here) → Part 2 TaskBoard app → Part 3 Playwright TS + CI
```

**Scope:** develop-oriented TypeScript for builders who also test. Not a re-teach of JE or thin tester TS.

---

## Table of Contents

1. [Beyond thin TS](#1-beyond-thin-ts)
2. [Modules](#2-modules)
3. [Async & Promise typing](#3-async--promise-typing)
4. [Generics (light)](#4-generics-light)
5. [Utility types (light)](#5-utility-types-light)
6. [Strict tsconfig](#6-strict-tsconfig)
7. [Discriminated unions for APIs](#7-discriminated-unions-for-apis)
8. [Error typing](#8-error-typing)
9. [Practice & pitfalls](#9-practice--pitfalls)
10. [Challenges & answers](#10-challenges--answers)

**📈 Progress**

- [ ] §§1–3 modules + async  
- [ ] §§4–6 generics + utilities + tsconfig  
- [ ] §§7–8 API unions + errors  
- [ ] Practice + challenges → Part 2  

---

## 1. Beyond thin TS

> 🚩 **Why it matters:** Phase A taught types for helpers/POM. Phase B teaches types for **shipping an app** you can also test.

| Thin kit (`typescript-for-testers`) | This kit |
|---|---|
| Annotate fixtures & page objects | Modules, async APIs, generics |
| Read Playwright’s types | Design *your* API response types |
| Enough for automation hire path | Enough to build + test a small TS app |

You still need JE for JS foundations and Playwright Essentials for E2E strategy — we link, we don’t duplicate.

### 🧪 Quiz

1. Is thin TS enough for a TS-only develop role? **Answer:** No — use Phase B.  
2. What does Part 2 ship? **Answer:** A real TaskBoard Express app in TypeScript.

---

## 2. Modules

> 🚩 **Why it matters:** apps are files that import each other — wrong `module`/`moduleResolution` = red squiggles everywhere.

With `"module": "NodeNext"` and `"type": "module"` in `package.json`:

```ts
// types.ts
export type TaskStatus = "todo" | "doing" | "done";
export interface Task { id: string; title: string; status: TaskStatus; }

// store.ts
import type { Task } from "./types.js"; // .js extension in imports (emit path)
```

Rules of thumb:

- Prefer `import type { … }` when you only need types (erased at runtime).  
- Relative imports use the **`.js` extension** under NodeNext even if the source is `.ts`.  
- Don’t mix CommonJS `require` into an ESM app without a plan.

### 🧪 Quiz

1. Why `.js` in `import … from "./types.js"`? **Answer:** NodeNext resolves to the emitted file path.  
2. When use `import type`? **Answer:** When the import is types-only (no runtime value).

---

## 3. Async & Promise typing

> 🚩 **Why it matters:** every Express handler and `fetch` path returns a Promise — typing the *resolved* value prevents “data is any”.

```ts
async function loadTasks(token: string): Promise<Task[]> {
  const res = await fetch("/api/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body: unknown = await res.json();
  // narrow body before using — see §7
  return []; // placeholder
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

Annotate **return types** on exported async functions. Prefer `unknown` for JSON, then narrow.

### 🧪 Quiz

1. What is the return type of `async function f(): Promise<number>` when you `return 1`? **Answer:** `Promise<number>`.  
2. Prefer `any` or `unknown` for `res.json()`? **Answer:** `unknown`, then narrow.

---

## 4. Generics (light)

> 🚩 **Why it matters:** one helper, many shapes — without sliding into `any`.

```ts
type ApiOk<T> = { ok: true; data: T };
type ApiErr = { ok: false; error: string; code: string };
type ApiResult<T> = ApiOk<T> | ApiErr;

function ok<T>(data: T): ApiOk<T> {
  return { ok: true, data };
}

const health = ok({ status: "up" as const });
// health.data.status is "up"
```

You don’t need advanced conditional types for Part 2 — `ApiResult<T>` is enough.

### 🧪 Quiz

1. What does `T` stand for in `ApiOk<T>`? **Answer:** A type parameter — filled in by the caller/inference.  
2. Is `ok(42)` an `ApiOk<number>`? **Answer:** Yes (inferred).

---

## 5. Utility types (light)

> 🚩 **Why it matters:** PATCH bodies and “public user” views are almost always a slice of a fuller type.

```ts
interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  ownerId: string;
}

type CreateTaskBody = Pick<Task, "title"> & { status?: TaskStatus };
type UpdateTaskBody = Partial<Pick<Task, "title" | "status">>;
type TaskPublic = Omit<Task, "ownerId">;
type StatusCounts = Record<TaskStatus, number>;
```

Memorize four: `Partial`, `Pick`, `Omit`, `Record`. Skip deep `infer` gymnastics here.

### 🧪 Quiz

1. `Partial<Task>` makes which fields optional? **Answer:** All of them.  
2. `Omit<Task, "ownerId">` removes what? **Answer:** The `ownerId` property.

---

## 6. Strict tsconfig

> 🚩 **Why it matters:** `strict: true` is the default professional bar; extra flags catch index/unsafe access.

This kit’s `tsconfig.json` highlights:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ES2022"
  }
}
```

`noUncheckedIndexedAccess` makes `map.get(id)` and `arr[0]` possibly `undefined` — force a check. That’s a feature, not a bug.

### 🧪 Quiz

1. Name one flag beyond `strict` used here. **Answer:** `noUncheckedIndexedAccess`.  
2. Does `strict` include `strictNullChecks`? **Answer:** Yes.

---

## 7. Discriminated unions for APIs

> 🚩 **Why it matters:** every response is either success or failure — one field (`ok`) tells TypeScript which shape you have.

```ts
type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; code: string };

function titleOrError(result: ApiResult<{ title: string }>): string {
  if (result.ok) return result.data.title; // narrowed
  return result.error;                     // narrowed
}
```

TaskBoard uses this pattern for `/api/login`, `/api/tasks`, etc. UI and tests both branch on `ok`.

### 🧪 Quiz

1. What is the discriminant in `ApiResult`? **Answer:** `ok` (boolean literal).  
2. After `if (result.ok)`, can you read `result.error`? **Answer:** No — that property exists only on the error branch.

---

## 8. Error typing

> 🚩 **Why it matters:** `catch (e)` is `unknown` under strict — treat it that way.

```ts
function messageOf(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Unknown error";
}

// API layer: stable machine codes for clients/tests
type ApiErr = { ok: false; error: string; code: "VALIDATION" | "UNAUTHORIZED" | "NOT_FOUND" | "BAD_CREDENTIALS" };
```

Tests can assert `body.code === "BAD_CREDENTIALS"` without parsing free-form strings only.

### 🧪 Quiz

1. Type of `catch (e) { … e }` under strict? **Answer:** `unknown` (you must narrow).  
2. Why send `code` as well as `error`? **Answer:** Stable assertions / client branching.

---

## 9. Practice & pitfalls

**Exercises**

1. Write `ApiResult<string>` for a successful `"pong"` payload.  
2. Type a function `firstTask(tasks: Task[]): Task | undefined` that returns `tasks[0]` safely under `noUncheckedIndexedAccess`.  
3. Define `UpdateTaskBody` with `Partial` + `Pick` for `title` and `status`.

**Pitfalls**

| Pitfall | Fix |
|---|---|
| `data: any` after JSON | `unknown` + narrow / zod later |
| Forgetting `.js` in ESM imports | Match NodeNext emit paths |
| `ok: boolean` instead of `ok: true \| false` literals | Use literal discriminants |
| Catching as `any` | Narrow `unknown` |

---

## 10. Challenges & answers

**C1.** Implement `function unwrap<T>(r: ApiResult<T>): T` that throws on error.  
**C2.** Given `Record<TaskStatus, number>`, write a value with all three keys.  
**C3.** Why does TaskBoard return `{ ok: false, code, error }` instead of only HTTP status?

<details>
<summary>Answers</summary>

**C1**
```ts
function unwrap<T>(r: ApiResult<T>): T {
  if (r.ok) return r.data;
  throw new Error(`${r.code}: ${r.error}`);
}
```

**C2** `{ todo: 0, doing: 1, done: 2 }`

**C3** Clients/tests get a **typed, stable body** even when status codes vary; discriminant `ok` narrows cleanly in TS.

</details>

---

**Next:** Part 2 — build/run the TaskBoard app (`npm start`).  
Hub: [`index.html`](index.html) · Thin TS refresher: [`../typescript-for-testers`](../typescript-for-testers/)

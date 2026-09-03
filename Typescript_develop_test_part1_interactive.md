# TypeScript Develop + Test — Part 1: Deeper TypeScript

<div class="interactive-note">💡 <strong>Interactive edition:</strong> quizzes, flashcards, predict cards. Best in <strong>VS Code preview</strong> (<code>Ctrl+Shift+V</code>). Study app adds progress + certificate.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#1e3a5f;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;">
  <a href="index.html" style="color:#7dd3fc;font-weight:600;text-decoration:none;">Hub</a>
  <strong style="color:#fff;">1 Deeper TS</strong>
  <a href="Typescript_develop_test_part2_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">2 App →</a>
  <a href="Typescript_develop_test_part3_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">3 Test →</a>
</div>

<style>
h2 { border-bottom: 3px solid #3178C6; padding-bottom: 6px; }
.interactive-note { background: #eff6ff; border-left: 4px solid #3178C6; padding: 10px 14px; border-radius: 6px; }
.why { background:#ebf4ff; border-left:4px solid #3178C6; padding:6px 12px; border-radius:6px; margin:6px 0 10px 0; font-size:0.92rem; }
.quiz-box { background: #f7fafc; border: 2px solid #3178C6; border-radius: 10px; padding: 14px 18px; margin: 18px 0; }
.quiz-box details { background: #ffffff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.quiz-box summary { cursor: pointer; font-weight: 600; }
.quiz-correct { color: #276749; font-weight: 700; }
.flashcard { background: #fffbeb; border: 2px solid #d69e2e; border-radius: 10px; padding: 10px 14px; margin: 10px 0; }
.flashcard summary { cursor: pointer; font-weight: 700; color: #744210; }
.predict { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; margin: 14px 0; }
.predict details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; }
.predict summary { cursor: pointer; font-weight: 600; }
.study-plan { background: #eff6ff; border: 1px solid #3178C6; border-radius: 10px; padding: 10px 16px; margin: 14px 0; }
.study-plan summary { cursor: pointer; font-weight: 700; color: #1e40af; }
.footer { text-align: center; padding: 18px; margin-top: 30px; background: #3178C6; color: #fff; border-radius: 10px; }
@media (prefers-color-scheme: dark) {
  .interactive-note, .study-plan { background: #0f1a2a; }
  .quiz-box { background: #151f30; }
  .quiz-box details, .predict details { background: #0d1420; border-color: #28374d; color: #e2e8f0; }
  .flashcard { background: #241d0e; color: #e2e8f0; }
}
</style>

<details class="study-plan">
<summary>📅 Suggested 5-day plan (Part 1)</summary>
<ol>
<li><strong>Day 1:</strong> §§1–2 beyond thin + modules</li>
<li><strong>Day 2:</strong> §3 async typing</li>
<li><strong>Day 3:</strong> §§4–5 generics + utilities</li>
<li><strong>Day 4:</strong> §§6–8 tsconfig + unions + errors</li>
<li><strong>Day 5:</strong> practice → Part 2 app</li>
</ol>
</details>

---

## 1. Beyond thin TS

<div class="why">🚩 <strong>Why it matters:</strong> Phase A = types for tests. Phase B = types for shipping an app you also test.</div>

| Thin kit | This kit |
|---|---|
| Helpers / POM | Modules, async APIs, generics |
| Automation hire path | Build + test a small TS app |

<div class="quiz-box">
<h3>🧪 Self-test</h3>
<details><summary>Is thin TS enough for TS-only develop jobs?</summary><p class="quiz-correct">No — Phase B closes that gap.</p></details>
<details><summary>What does Part 2 ship?</summary><p class="quiz-correct">A real TaskBoard Express app in TypeScript.</p></details>
</div>

<details class="flashcard"><summary>🃏 When do you leave typescript-for-testers for this kit?</summary><p>When you need to design app modules/API types — not only annotate test helpers.</p></details>

---

## 2. Modules

<div class="why">🚩 <strong>Why it matters:</strong> NodeNext + ESM means <code>.js</code> extensions in relative imports.</div>

```ts
import type { Task } from "./types.js";
export type TaskStatus = "todo" | "doing" | "done";
```

<div class="quiz-box">
<details><summary>Why import from <code>./types.js</code> when the file is <code>types.ts</code>?</summary><p class="quiz-correct">NodeNext resolves the emitted path.</p></details>
<details><summary>When use <code>import type</code>?</summary><p class="quiz-correct">Types-only imports (erased at runtime).</p></details>
</div>

---

## 3. Async & Promise typing

<div class="why">🚩 <strong>Why it matters:</strong> annotate the resolved value — stop <code>data: any</code>.</div>

```ts
async function load(): Promise<string[]> {
  return ["a", "b"];
}
```

<div class="predict">
<details><summary>Predict: type of <code>await load()</code>?</summary><p class="quiz-correct"><code>string[]</code></p></details>
<details><summary>Predict: prefer <code>any</code> or <code>unknown</code> for JSON?</summary><p class="quiz-correct"><code>unknown</code>, then narrow</p></details>
</div>

---

## 4. Generics (light)

<div class="why">🚩 <strong>Why it matters:</strong> one <code>ApiOk&lt;T&gt;</code> for every endpoint payload.</div>

```ts
type ApiOk<T> = { ok: true; data: T };
function ok<T>(data: T): ApiOk<T> { return { ok: true, data }; }
```

<div class="quiz-box">
<details><summary>Type of <code>ok(42)</code>?</summary><p class="quiz-correct"><code>ApiOk&lt;number&gt;</code></p></details>
</div>

<details class="flashcard"><summary>🃏 What is <code>T</code>?</summary><p>A type parameter filled by inference or the caller.</p></details>

---

## 5. Utility types (light)

<div class="why">🚩 <strong>Why it matters:</strong> PATCH bodies are slices — use <code>Partial</code>/<code>Pick</code>/<code>Omit</code>/<code>Record</code>.</div>

```ts
type UpdateTaskBody = Partial<Pick<Task, "title" | "status">>;
```

<div class="quiz-box">
<details><summary>What does <code>Omit&lt;Task, "ownerId"&gt;</code> remove?</summary><p class="quiz-correct">The <code>ownerId</code> field.</p></details>
</div>

---

## 6. Strict tsconfig

<div class="why">🚩 <strong>Why it matters:</strong> <code>strict</code> + <code>noUncheckedIndexedAccess</code> force real checks.</div>

<div class="quiz-box">
<details><summary>Does <code>strict</code> include null checks?</summary><p class="quiz-correct">Yes (<code>strictNullChecks</code>).</p></details>
<details><summary>What does <code>noUncheckedIndexedAccess</code> change about <code>arr[0]</code>?</summary><p class="quiz-correct">It becomes <code>T | undefined</code>.</p></details>
</div>

---

## 7. Discriminated unions for APIs

<div class="why">🚩 <strong>Why it matters:</strong> <code>ok: true | false</code> narrows success vs error shapes.</div>

```ts
type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; code: string };
```

<div class="predict">
<details><summary>After <code>if (r.ok)</code>, can you read <code>r.error</code>?</summary><p class="quiz-correct">No — only <code>r.data</code> exists on that branch.</p></details>
</div>

---

## 8. Error typing

<div class="why">🚩 <strong>Why it matters:</strong> <code>catch (e)</code> is <code>unknown</code> — narrow before use; API <code>code</code> helps tests.</div>

<div class="quiz-box">
<details><summary>Type of caught <code>e</code> under strict?</summary><p class="quiz-correct"><code>unknown</code></p></details>
<details><summary>Why return <code>code</code> with <code>error</code>?</summary><p class="quiz-correct">Stable client/test branching.</p></details>
</div>

---

## Practice spot-check

<div class="quiz-box">
<details><summary>Write a successful <code>ApiResult&lt;string&gt;</code> for <code>"pong"</code></summary><p class="quiz-correct"><code>{ ok: true, data: "pong" }</code></p></details>
<details><summary>Spot the bug: <code>ok: boolean</code> on both branches</summary><p class="quiz-correct">Use literal <code>ok: true</code> / <code>ok: false</code> so narrowing works.</p></details>
</div>

<div class="footer">Part 1 complete → open Part 2 and run <code>npm start</code> on the TaskBoard.</div>

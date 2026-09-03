# TypeScript Develop + Test — Part 2: TaskBoard App

<div class="interactive-note">💡 Interactive edition — VS Code preview (<code>Ctrl+Shift+V</code>). Run the real app with <code>npm start</code>.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#1e3a5f;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;">
  <a href="index.html" style="color:#7dd3fc;font-weight:600;text-decoration:none;">Hub</a>
  <a href="Typescript_develop_test_part1_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">← 1 TS</a>
  <strong style="color:#fff;">2 App</strong>
  <a href="Typescript_develop_test_part3_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">3 Test →</a>
</div>

<style>
h2 { border-bottom: 3px solid #0f766e; padding-bottom: 6px; }
.interactive-note { background: #ecfdf5; border-left: 4px solid #0f766e; padding: 10px 14px; border-radius: 6px; }
.why { background:#ecfdf5; border-left:4px solid #0f766e; padding:6px 12px; border-radius:6px; margin:6px 0 10px; font-size:0.92rem; }
.quiz-box { background: #f8fafc; border: 2px solid #0f766e; border-radius: 10px; padding: 14px 18px; margin: 18px 0; }
.quiz-box details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.quiz-box summary { cursor: pointer; font-weight: 600; }
.quiz-correct { color: #276749; font-weight: 700; }
.flashcard { background: #fffbeb; border: 2px solid #d69e2e; border-radius: 10px; padding: 10px 14px; margin: 10px 0; }
.flashcard summary { cursor: pointer; font-weight: 700; color: #744210; }
.study-plan { background: #ecfdf5; border: 1px solid #0f766e; border-radius: 10px; padding: 10px 16px; margin: 14px 0; }
.study-plan summary { cursor: pointer; font-weight: 700; color: #065f46; }
.footer { text-align: center; padding: 18px; margin-top: 30px; background: #0f766e; color: #fff; border-radius: 10px; }
@media (prefers-color-scheme: dark) {
  .interactive-note, .study-plan, .why { background: #0c1f1a; }
  .quiz-box { background: #12201c; }
  .quiz-box details { background: #0a1411; border-color: #1e3a34; color: #e2e8f0; }
  .flashcard { background: #241d0e; color: #e2e8f0; }
}
</style>

<details class="study-plan">
<summary>📅 Suggested plan (Part 2)</summary>
<ol>
<li>Read §§1–2 · skim <code>src/</code></li>
<li>Run <code>npm start</code> · log in as alice</li>
<li>§§3–5 types, routes, seed</li>
<li>§6 click through UI · try bob</li>
<li>§7 build · jump to Part 3 tests</li>
</ol>
</details>

---

## 1. Why a tiny real app

<div class="why">🚩 <strong>Why it matters:</strong> something Playwright can hit — not slides only.</div>

Express + TS API · in-memory store · vanilla UI · Bearer auth. No React/Next overbuild.

<div class="quiz-box">
<details><summary>Default port?</summary><p class="quiz-correct">3847</p></details>
<details><summary>Why in-memory store?</summary><p class="quiz-correct">Simple demos + deterministic test resets.</p></details>
</div>

---

## 2. Layout & tsconfig

```
src/types.ts · store.ts · seed.ts · auth.ts · server.ts · public/
```

<div class="quiz-box">
<details><summary>Where are HTTP routes?</summary><p class="quiz-correct"><code>src/server.ts</code></p></details>
<details><summary>Does <code>tsc</code> copy HTML alone?</summary><p class="quiz-correct">No — <code>scripts/copy-public.mjs</code> after build.</p></details>
</div>

<details class="flashcard"><summary>🃏 What does <code>npm start</code> run?</summary><p><code>tsx src/server.ts</code></p></details>

---

## 3. Domain types & API unions

```ts
type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; code: string };
```

<div class="quiz-box">
<details><summary>Discriminant?</summary><p class="quiz-correct"><code>ok</code></p></details>
<details><summary>Task statuses?</summary><p class="quiz-correct">todo · doing · done</p></details>
</div>

---

## 4. Auth + CRUD

| Path | Auth |
|---|---|
| POST `/api/login` | no |
| GET/POST `/api/tasks` | Bearer |
| PATCH/DELETE `/api/tasks/:id` | Bearer |
| POST `/api/reset` | no (demo/tests) |

<div class="quiz-box">
<details><summary>Auth header form?</summary><p class="quiz-correct"><code>Authorization: Bearer &lt;token&gt;</code></p></details>
<details><summary>Can Bob see Alice’s tasks?</summary><p class="quiz-correct">No — owner-scoped.</p></details>
</div>

---

## 5. Deterministic seed

Alice ×3 tasks · Bob ×1 · fixed titles for assertions · `POST /api/reset` restores.

<div class="quiz-box">
<details><summary>Total tasks after seed?</summary><p class="quiz-correct">4</p></details>
</div>

---

## 6. Vanilla UI ↔ API

Token in `localStorage` · columns by status · locators like `#loginBtn`, `.task`.

<div class="quiz-box">
<details><summary>Storage key for token?</summary><p class="quiz-correct"><code>taskboard_token</code></p></details>
</div>

---

## 7. Run / build

```bash
npm start
npm run build && npm run start:dist
```

<div class="quiz-box">
<details><summary>Health endpoint?</summary><p class="quiz-correct"><code>GET /api/health</code></p></details>
</div>

---

## 8. Practice

1. Add a task as alice · move to Doing  
2. Login as bob · confirm isolation  
3. Reset · run Part 3 `npm test`

<div class="footer">Part 2 → Part 3 Playwright TS against this app</div>

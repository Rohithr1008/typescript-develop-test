# TypeScript Develop + Test — Part 3: Playwright in TS

<div class="interactive-note">💡 Interactive edition. Deep E2E pedagogy → <a href="../playwright-essentials/">playwright-essentials</a>. Thin types → <a href="../typescript-for-testers/">typescript-for-testers</a>.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#1e3a5f;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;">
  <a href="index.html" style="color:#7dd3fc;font-weight:600;text-decoration:none;">Hub</a>
  <a href="Typescript_develop_test_part1_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">← 1</a>
  <a href="Typescript_develop_test_part2_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">← 2</a>
  <strong style="color:#fff;">3 Test</strong>
</div>

<style>
h2 { border-bottom: 3px solid #7c3aed; padding-bottom: 6px; }
.interactive-note { background: #f5f3ff; border-left: 4px solid #7c3aed; padding: 10px 14px; border-radius: 6px; }
.why { background:#f5f3ff; border-left:4px solid #7c3aed; padding:6px 12px; border-radius:6px; margin:6px 0 10px; font-size:0.92rem; }
.quiz-box { background: #f8fafc; border: 2px solid #7c3aed; border-radius: 10px; padding: 14px 18px; margin: 18px 0; }
.quiz-box details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.quiz-box summary { cursor: pointer; font-weight: 600; }
.quiz-correct { color: #276749; font-weight: 700; }
.flashcard { background: #fffbeb; border: 2px solid #d69e2e; border-radius: 10px; padding: 10px 14px; margin: 10px 0; }
.flashcard summary { cursor: pointer; font-weight: 700; color: #744210; }
.study-plan { background: #f5f3ff; border: 1px solid #7c3aed; border-radius: 10px; padding: 10px 16px; margin: 14px 0; }
.study-plan summary { cursor: pointer; font-weight: 700; color: #5b21b6; }
.footer { text-align: center; padding: 18px; margin-top: 30px; background: #7c3aed; color: #fff; border-radius: 10px; }
@media (prefers-color-scheme: dark) {
  .interactive-note, .study-plan, .why { background: #1a1028; }
  .quiz-box { background: #1c1528; }
  .quiz-box details { background: #120c1c; border-color: #2e1f45; color: #e2e8f0; }
  .flashcard { background: #241d0e; color: #e2e8f0; }
}
</style>

<details class="study-plan">
<summary>📅 Suggested plan (Part 3)</summary>
<ol>
<li>§§1–2 loop + link map</li>
<li>Read <code>playwright.config.ts</code></li>
<li>Skim API + E2E specs</li>
<li>Run <code>npm test</code> · open report</li>
<li>Skim <code>.github/workflows/ci.yml</code></li>
</ol>
</details>

---

## 1. Develop + test loop

<div class="why">🚩 <strong>Why it matters:</strong> same repo owns the app and the proof.</div>

```
change code → npm test → push → CI uploads HTML report
```

<div class="quiz-box">
<details><summary>Who starts the server for tests?</summary><p class="quiz-correct">Playwright <code>webServer</code> (<code>npm start</code>)</p></details>
<details><summary>Why reset in <code>beforeEach</code>?</summary><p class="quiz-correct">Deterministic seed; no cross-test pollution</p></details>
</div>

---

## 2. Link map

| Need | Go to |
|---|---|
| Thin helper types | `typescript-for-testers` |
| E2E strategy / flakes | `playwright-essentials` |
| Show a green pipeline | `automation-portfolio` |

<details class="flashcard"><summary>🃏 Does Part 3 re-teach full Playwright?</summary><p>No — it wires TS tests to TaskBoard and points sideways.</p></details>

---

## 3. Config + webServer

`workers: 1` · health URL wait · HTML + list reporters.

<div class="quiz-box">
<details><summary>Why one worker?</summary><p class="quiz-correct">Shared in-memory store isn’t multi-process safe.</p></details>
</div>

---

## 4. API request tests

Health · bad login code · CRUD · owner isolation. Helpers: `apiLogin`, `apiReset`.

<div class="quiz-box">
<details><summary>Alice task count after seed?</summary><p class="quiz-correct">3</p></details>
<details><summary>Bad password API code?</summary><p class="quiz-correct"><code>BAD_CREDENTIALS</code></p></details>
</div>

---

## 5. E2E + BoardPage

Light typed helper: `login`, `addTask`, `moveTask`, `deleteTask`.

<div class="quiz-box">
<details><summary>Login button locator?</summary><p class="quiz-correct"><code>#loginBtn</code></p></details>
</div>

---

## 6. HTML reporter

```bash
npm test
npm run test:report
```

<div class="quiz-box">
<details><summary>Report folder?</summary><p class="quiz-correct"><code>playwright-report/</code></p></details>
</div>

---

## 7. GitHub Actions

`npm ci` → `build` → install Chromium → `npm test` → upload artifact.

<div class="quiz-box">
<details><summary>Does CI run <code>tsc</code>?</summary><p class="quiz-correct">Yes — via <code>npm run build</code></p></details>
</div>

---

## 8. Practice

Break a seed title → red · fix → green · open report · optional CI artifact.

<div class="footer">Phase B complete — develop + test loop in one repo ❤️</div>

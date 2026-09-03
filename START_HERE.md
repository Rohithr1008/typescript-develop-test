# START HERE — TypeScript Develop + Test

Calm entry for **Phase B**. Three parts: deeper TS → TaskBoard app → Playwright in TS + CI.

**Path plan:** [`../automation-tester-path/ROADMAP.md`](../automation-tester-path/ROADMAP.md) · **Map:** [`../automation-tester-path/README.md`](../automation-tester-path/README.md)  
**Hub:** [`index.html`](index.html)

---

## Before this kit

Finish **Phase A** first (or know you can skip):

1. JE Parts 1–5 → [`../javascript-essentials/`](../javascript-essentials/)  
2. HTML & CSS Part 1 → [`../html-css-essentials/`](../html-css-essentials/)  
3. TypeScript for Testers (thin) → [`../typescript-for-testers/`](../typescript-for-testers/)  
4. Playwright → [`../playwright-essentials/`](../playwright-essentials/)  
5. JE 6 → API → Perf → portfolio as needed  

Then Phase B:

6. HTML & CSS Parts 2–3 (deeper FE)  
7. **This kit** — deeper TS · TaskBoard app · Playwright in TS · CI  

---

## Study order (this kit)

| Step | Part | What you do |
|---|---|---|
| 1 | **Part 1** — Deeper TypeScript | Modules, async, generics, utilities, strict tsconfig, API unions, errors |
| 2 | **Part 2** — TaskBoard app | Read + run `npm start` · explore typed CRUD + vanilla UI |
| 3 | **Part 3** — Playwright in TS | `npm test` · read helpers/API tests · skim CI workflow |

Open [`index.html`](index.html) and pick a study app, or preview `.md` files in VS Code (`Ctrl+Shift+V`).

---

## Run the lab

```bash
npm install
npx playwright install chromium   # first time only

npm start          # http://localhost:3847 — alice/alice123 · bob/bob123
npm test           # E2E + API tests (starts server automatically)
npm run test:report
```

Study materials work offline. The lab needs Node 18+.

---

## Scope reminder

| This kit | Not this kit |
|---|---|
| Develop-oriented TS + small app + TS tests | Thin tester TS (`typescript-for-testers`) |
| Light Playwright wiring against *your* app | Full Playwright pedagogy (`playwright-essentials`) |
| CI snippet mirroring portfolio pattern | React/Next bootcamp |

---

*Read a little → run the app → write/fix a test → next part when ready.*

# PART 3 — Test What You Built (Plan)

> **Status:** ✅ Built — Playwright in TS + CI + three study editions.

## Goal

Prove the Part 2 TaskBoard with **Playwright tests written in TypeScript** (E2E + API request tests), a light typed page helper, HTML reporter, and GitHub Actions CI that uploads the report artifact.

## Test layout

| Piece | Location |
|---|---|
| Config | `playwright.config.ts` (webServer → `npm start`) |
| Helpers | `tests/helpers/board.ts` |
| API tests | `tests/api/tasks.api.spec.ts` |
| E2E tests | `tests/e2e/board.spec.ts` |
| CI | `.github/workflows/ci.yml` |

## Commands

```bash
npm test                 # starts app + runs Playwright
npm run test:report      # open HTML report locally
```

## Study sections (8)

1. Develop + test loop (why)  
2. Link map: thin TS · Playwright Essentials · portfolio  
3. `playwright.config.ts` + webServer  
4. API request tests in TS  
5. E2E + typed page helper  
6. HTML reporter + artifacts  
7. GitHub Actions CI  
8. Practice + path next steps  

## Editions

- `Typescript_develop_test_part3_with_examples.md`  
- `Typescript_develop_test_part3_interactive.md`  
- `Typescript_develop_test_part3_study_app.html`  
- `TYPESCRIPT_DEVELOP_TEST_PART3_CONTEXT.md`  

## Do not re-teach

Deep strategy / POM theory → [`../playwright-essentials`](../playwright-essentials/)  
Thin types for helpers → [`../typescript-for-testers`](../typescript-for-testers/)  
Portfolio packaging → [`../automation-portfolio`](../automation-portfolio/)  

---

_Phase B Part 3 — BUILT._

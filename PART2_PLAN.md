# PART 2 — Small TypeScript App (Plan)

> **Status:** ✅ Built — TaskBoard mini-app + three study editions.

## Goal

Ship a **real runnable** Express + TypeScript API with a simple vanilla UI (TaskBoard), typed CRUD, Bearer auth, deterministic seed — then study how the pieces fit.

## App shape

| Piece | Location |
|---|---|
| Types | `src/types.ts` |
| In-memory store + seed | `src/store.ts`, `src/seed.ts` |
| Auth middleware | `src/auth.ts` |
| Express server | `src/server.ts` |
| UI | `src/public/index.html`, `app.js` |

## Commands

```bash
npm install
npm start          # http://localhost:3847
npm run build      # tsc + copy public → dist
```

Seed users: `alice / alice123` · `bob / bob123`

## Study sections (8)

1. Why a tiny real app  
2. Project layout + strict tsconfig  
3. Domain types + API result unions  
4. Auth + CRUD routes  
5. Seed data for demos/tests  
6. Vanilla UI talking to typed API  
7. Run / build checklist  
8. Practice + next → Part 3  

## Editions

- `Typescript_develop_test_part2_with_examples.md`  
- `Typescript_develop_test_part2_interactive.md`  
- `Typescript_develop_test_part2_study_app.html`  
- `TYPESCRIPT_DEVELOP_TEST_PART2_CONTEXT.md`  

---

_Phase B Part 2 — BUILT._

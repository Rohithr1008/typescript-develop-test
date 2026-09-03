import { store } from "./store.js";
import type { Task, User } from "./types.js";

/** Deterministic seed — same every boot. Safe for demos + Playwright. */
export function seedStore(): void {
  store.reset();

  const users: User[] = [
    {
      id: "user-alice",
      username: "alice",
      password: "alice123",
      displayName: "Alice Builder",
    },
    {
      id: "user-bob",
      username: "bob",
      password: "bob123",
      displayName: "Bob Tester",
    },
  ];

  for (const u of users) store.users.set(u.id, u);

  const fixedNow = "2026-01-15T10:00:00.000Z";
  const tasks: Task[] = [
    {
      id: "task-1",
      title: "Wire typed API responses",
      status: "doing",
      ownerId: "user-alice",
      createdAt: fixedNow,
      updatedAt: fixedNow,
    },
    {
      id: "task-2",
      title: "Add Playwright smoke for login",
      status: "todo",
      ownerId: "user-alice",
      createdAt: "2026-01-15T10:05:00.000Z",
      updatedAt: "2026-01-15T10:05:00.000Z",
    },
    {
      id: "task-3",
      title: "Ship CI with HTML report artifact",
      status: "todo",
      ownerId: "user-alice",
      createdAt: "2026-01-15T10:10:00.000Z",
      updatedAt: "2026-01-15T10:10:00.000Z",
    },
    {
      id: "task-4",
      title: "Review Part 1 generics notes",
      status: "done",
      ownerId: "user-bob",
      createdAt: fixedNow,
      updatedAt: fixedNow,
    },
  ];

  for (const t of tasks) store.tasks.set(t.id, t);
}

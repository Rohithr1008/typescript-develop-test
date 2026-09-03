import type { Session, Task, User } from "./types.js";

/** In-memory store — resets on process restart. Seeded deterministically. */
export class Store {
  users = new Map<string, User>();
  tasks = new Map<string, Task>();
  sessions = new Map<string, Session>();

  reset(): void {
    this.users.clear();
    this.tasks.clear();
    this.sessions.clear();
  }

  findUserByUsername(username: string): User | undefined {
    for (const u of this.users.values()) {
      if (u.username === username) return u;
    }
    return undefined;
  }

  listTasksForUser(userId: string): Task[] {
    return [...this.tasks.values()]
      .filter((t) => t.ownerId === userId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }
}

export const store = new Store();

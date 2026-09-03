import type { APIRequestContext, Page } from "@playwright/test";

/** Light typed page helper for TaskBoard UI. */
export class BoardPage {
  constructor(readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator("#username").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#loginBtn").click();
    await this.page.locator("#boardView").waitFor({ state: "visible" });
  }

  async addTask(title: string): Promise<void> {
    await this.page.locator("#newTitle").fill(title);
    await this.page.locator("#addBtn").click();
  }

  taskCard(title: string) {
    return this.page.locator(".task").filter({ hasText: title });
  }

  async moveTask(title: string, status: "todo" | "doing" | "done"): Promise<void> {
    await this.taskCard(title).locator(`button[data-act="${status}"]`).click();
  }

  async deleteTask(title: string): Promise<void> {
    await this.taskCard(title).locator('button[data-act="delete"]').click();
  }

  whoBadge() {
    return this.page.locator("#whoBadge");
  }
}

export type LoginOk = {
  ok: true;
  data: { token: string; username: string; displayName: string };
};

/** API helper — request fixture, typed login. */
export async function apiLogin(
  request: APIRequestContext,
  username: string,
  password: string,
): Promise<string> {
  const res = await request.post("/api/login", { data: { username, password } });
  const body = (await res.json()) as LoginOk | { ok: false; error: string };
  if (!body.ok) throw new Error(`login failed: ${JSON.stringify(body)}`);
  return body.data.token;
}

export async function apiReset(request: APIRequestContext): Promise<void> {
  const res = await request.post("/api/reset");
  if (!res.ok()) throw new Error(`reset failed: ${res.status()}`);
}

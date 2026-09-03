import { expect, test } from "@playwright/test";
import { BoardPage, apiReset } from "../helpers/board";

test.beforeEach(async ({ request }) => {
  await apiReset(request);
});

test("login shows seeded Alice tasks", async ({ page }) => {
  const board = new BoardPage(page);
  await board.goto();
  await board.login("alice", "alice123");
  await expect(board.whoBadge()).toContainText("Alice Builder");
  await expect(board.taskCard("Wire typed API responses")).toBeVisible();
  await expect(board.taskCard("Add Playwright smoke for login")).toBeVisible();
  await expect(board.taskCard("Ship CI with HTML report artifact")).toBeVisible();
});

test("add and move a task on the board", async ({ page }) => {
  const board = new BoardPage(page);
  await board.goto();
  await board.login("alice", "alice123");
  await board.addTask("E2E brand-new task");
  await expect(board.taskCard("E2E brand-new task")).toBeVisible();
  await board.moveTask("E2E brand-new task", "doing");
  await expect(
    page.locator('.col[data-status="doing"] .task').filter({ hasText: "E2E brand-new task" }),
  ).toBeVisible();
});

test("delete removes task from UI", async ({ page }) => {
  const board = new BoardPage(page);
  await board.goto();
  await board.login("alice", "alice123");
  await board.addTask("Disposable task");
  await board.deleteTask("Disposable task");
  await expect(board.taskCard("Disposable task")).toHaveCount(0);
});

test("bad password shows login error", async ({ page }) => {
  const board = new BoardPage(page);
  await board.goto();
  await page.locator("#username").fill("alice");
  await page.locator("#password").fill("nope");
  await page.locator("#loginBtn").click();
  await expect(page.locator("#loginError")).toBeVisible();
  await expect(page.locator("#loginError")).toContainText(/invalid/i);
  await expect(page.locator("#boardView")).toBeHidden();
});

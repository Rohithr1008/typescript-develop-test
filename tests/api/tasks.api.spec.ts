import { expect, test } from "@playwright/test";
import { apiLogin, apiReset } from "../helpers/board";

test.beforeEach(async ({ request }) => {
  await apiReset(request);
});

test("health returns ok + seed counts", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body).toMatchObject({
    ok: true,
    data: { status: "up", users: 2, tasks: 4 },
  });
});

test("login rejects bad credentials", async ({ request }) => {
  const res = await request.post("/api/login", {
    data: { username: "alice", password: "wrong" },
  });
  expect(res.status()).toBe(401);
  const body = await res.json();
  expect(body.ok).toBe(false);
  expect(body.code).toBe("BAD_CREDENTIALS");
});

test("CRUD tasks for authenticated user", async ({ request }) => {
  const token = await apiLogin(request, "alice", "alice123");
  const headers = { Authorization: `Bearer ${token}` };

  const list1 = await request.get("/api/tasks", { headers });
  const listed = await list1.json();
  expect(listed.ok).toBe(true);
  expect(listed.data).toHaveLength(3);

  const created = await request.post("/api/tasks", {
    headers,
    data: { title: "API-created task" },
  });
  expect(created.status()).toBe(201);
  const createdBody = await created.json();
  expect(createdBody.ok).toBe(true);
  expect(createdBody.data.title).toBe("API-created task");
  expect(createdBody.data.status).toBe("todo");
  const id = createdBody.data.id as string;

  const patched = await request.patch(`/api/tasks/${id}`, {
    headers,
    data: { status: "doing" },
  });
  const patchedBody = await patched.json();
  expect(patchedBody.ok).toBe(true);
  expect(patchedBody.data.status).toBe("doing");

  const deleted = await request.delete(`/api/tasks/${id}`, { headers });
  expect((await deleted.json()).ok).toBe(true);

  const list2 = await request.get("/api/tasks", { headers });
  expect((await list2.json()).data).toHaveLength(3);
});

test("user cannot see another user's tasks", async ({ request }) => {
  const bobToken = await apiLogin(request, "bob", "bob123");
  const res = await request.get("/api/tasks", {
    headers: { Authorization: `Bearer ${bobToken}` },
  });
  const body = await res.json();
  expect(body.ok).toBe(true);
  expect(body.data).toHaveLength(1);
  expect(body.data[0].title).toContain("generics");
});

import cors from "cors";
import express from "express";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { err, requireAuth, type AuthedRequest } from "./auth.js";
import { seedStore } from "./seed.js";
import { store } from "./store.js";
import type {
  ApiOk,
  CreateTaskBody,
  LoginBody,
  Session,
  Task,
  TaskStatus,
  UpdateTaskBody,
} from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 3847);

const STATUSES: TaskStatus[] = ["todo", "doing", "done"];

function isStatus(v: unknown): v is TaskStatus {
  return typeof v === "string" && (STATUSES as string[]).includes(v);
}

function ok<T>(data: T): ApiOk<T> {
  return { ok: true, data };
}

seedStore();

const app = express();
app.use(cors());
app.use(express.json({ limit: "32kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json(ok({ status: "up", tasks: store.tasks.size, users: store.users.size }));
});

/** Demo reset — restores deterministic seed (tests + classroom). */
app.post("/api/reset", (_req, res) => {
  seedStore();
  res.json(ok({ reset: true, tasks: store.tasks.size }));
});

app.post("/api/login", (req, res) => {
  const body = req.body as LoginBody;
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!username || !password) {
    err(res, 400, "VALIDATION", "username and password required");
    return;
  }
  const user = store.findUserByUsername(username);
  if (!user || user.password !== password) {
    err(res, 401, "BAD_CREDENTIALS", "Invalid username or password");
    return;
  }
  const token = `tok-${user.id}-${randomUUID().slice(0, 8)}`;
  const session: Session = {
    token,
    userId: user.id,
    username: user.username,
    displayName: user.displayName,
  };
  store.sessions.set(token, session);
  res.json(ok({ token, username: user.username, displayName: user.displayName }));
});

app.post("/api/logout", requireAuth, (req, res) => {
  const { session } = req as AuthedRequest;
  store.sessions.delete(session.token);
  res.json(ok({ loggedOut: true }));
});

app.get("/api/me", requireAuth, (req, res) => {
  const { session } = req as AuthedRequest;
  res.json(
    ok({
      userId: session.userId,
      username: session.username,
      displayName: session.displayName,
    }),
  );
});

app.get("/api/tasks", requireAuth, (req, res) => {
  const { session } = req as AuthedRequest;
  res.json(ok(store.listTasksForUser(session.userId)));
});

app.post("/api/tasks", requireAuth, (req, res) => {
  const { session } = req as AuthedRequest;
  const body = req.body as CreateTaskBody;
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  if (!title) {
    err(res, 400, "VALIDATION", "title is required");
    return;
  }
  if (title.length > 120) {
    err(res, 400, "VALIDATION", "title too long (max 120)");
    return;
  }
  const status: TaskStatus = isStatus(body.status) ? body.status : "todo";
  const now = new Date().toISOString();
  const task: Task = {
    id: `task-${randomUUID().slice(0, 8)}`,
    title,
    status,
    ownerId: session.userId,
    createdAt: now,
    updatedAt: now,
  };
  store.tasks.set(task.id, task);
  res.status(201).json(ok(task));
});

app.patch("/api/tasks/:id", requireAuth, (req, res) => {
  const { session } = req as AuthedRequest;
  const id = req.params.id ?? "";
  const task = store.tasks.get(id);
  if (!task || task.ownerId !== session.userId) {
    err(res, 404, "NOT_FOUND", "Task not found");
    return;
  }
  const body = req.body as UpdateTaskBody;
  if (body.title !== undefined) {
    if (typeof body.title !== "string" || !body.title.trim()) {
      err(res, 400, "VALIDATION", "title must be a non-empty string");
      return;
    }
    task.title = body.title.trim();
  }
  if (body.status !== undefined) {
    if (!isStatus(body.status)) {
      err(res, 400, "VALIDATION", "status must be todo|doing|done");
      return;
    }
    task.status = body.status;
  }
  task.updatedAt = new Date().toISOString();
  store.tasks.set(task.id, task);
  res.json(ok(task));
});

app.delete("/api/tasks/:id", requireAuth, (req, res) => {
  const { session } = req as AuthedRequest;
  const id = req.params.id ?? "";
  const task = store.tasks.get(id);
  if (!task || task.ownerId !== session.userId) {
    err(res, 404, "NOT_FOUND", "Task not found");
    return;
  }
  store.tasks.delete(task.id);
  res.json(ok({ deleted: task.id }));
});

app.listen(PORT, () => {
  console.log(`TaskBoard listening on http://localhost:${PORT}`);
  console.log(`Login: alice / alice123  ·  bob / bob123`);
});

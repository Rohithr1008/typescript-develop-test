/** Shared domain types for TaskBoard API + UI. */

export type TaskStatus = "todo" | "doing" | "done";

export interface User {
  id: string;
  username: string;
  /** Plain demo password — never do this in production. */
  password: string;
  displayName: string;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  token: string;
  userId: string;
  username: string;
  displayName: string;
}

export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; error: string; code: string };
export type ApiResult<T> = ApiOk<T> | ApiErr;

export interface CreateTaskBody {
  title: string;
  status?: TaskStatus;
}

export interface UpdateTaskBody {
  title?: string;
  status?: TaskStatus;
}

export interface LoginBody {
  username: string;
  password: string;
}

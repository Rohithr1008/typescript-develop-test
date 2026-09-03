import type { NextFunction, Request, Response } from "express";
import { store } from "./store.js";
import type { ApiErr, Session } from "./types.js";

export type AuthedRequest = Request & { session: Session };

function err(res: Response, status: number, code: string, error: string): void {
  const body: ApiErr = { ok: false, error, code };
  res.status(status).json(body);
}

/** Require `Authorization: Bearer <token>` and attach session. */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.header("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  const token = match?.[1]?.trim();
  if (!token) {
    err(res, 401, "UNAUTHORIZED", "Missing Bearer token");
    return;
  }
  const session = store.sessions.get(token);
  if (!session) {
    err(res, 401, "UNAUTHORIZED", "Invalid or expired token");
    return;
  }
  (req as AuthedRequest).session = session;
  next();
}

export { err };

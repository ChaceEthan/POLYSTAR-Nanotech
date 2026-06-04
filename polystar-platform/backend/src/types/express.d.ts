import type { AuthUser } from "@polystar/shared";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      requestId?: string;
    }
  }
}

export {};

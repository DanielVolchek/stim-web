import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import * as z from "zod";

import { User } from "@prisma/client";
import { authenticationFlow } from "../auth";

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  passwordHash: z.string(),
  Role: z.enum(["ADMIN", "USER"]),
});

function validateUser(user: unknown): User {
  return userSchema.parse(user);
}

export async function createContext(opts: CreateNextContextOptions) {
  let user;
  try {
    user = validateUser(await authenticationFlow(opts.req));
  } catch (error) {}

  return {
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const router = t.router;

const isAuthed = middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});

const isAdmin = middleware(async (opts) => {
  const { ctx } = opts;
  if (ctx.user?.Role !== "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */

export const publicProcedure = t.procedure;
export const userProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAdmin);

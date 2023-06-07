import hash from "crypto-js/md5";
import { v4 as uuid } from "uuid";
import { User, Session } from "@prisma/client";

import prisma from "./prisma";
import baseURL from "./url";
import { userSchema } from "./zod";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

type SafeUser = Omit<User, "passwordHash">;

const generateSession = () => {
  return uuid();
};

const hashPassword = (pass: string) => {
  return hash(pass).toString();
};

const getSessionByToken = async (token: string) => {
  const session = await prisma.session.findFirst({ where: { token } });
  return session;
};

const getUserBySession = async (session: Session) => {
  const user = await prisma.user.findFirst({
    where: {
      id: {
        equals: session.userID,
      },
    },
  });

  const valid = await validateSessionTime(session);
  if (!valid || !user) return false;

  return user;
};

const createSessionOnUser = async (user: User, sessionToken: string) => {
  await prisma.session.create({
    data: {
      token: sessionToken,
      userID: user.id,
      /* 1 month from now */
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      sessions: {
        connect: {
          token: sessionToken,
        },
      },
    },
  });
};

const validateSessionTime = async (session: Session) => {
  if (session.expiresAt.getTime() <= Date.now()) {
    await prisma.session.delete({ where: { id: session.id } });
    return false;
  }
  return true;
};

const unauthorizedResponse = (reason: string) => {
  throw new Error(reason);
};

const authenticationFlow = async (sessionToken: string | undefined) => {
  if (!sessionToken) return unauthorizedResponse("No token provided");

  const session = await getSessionByToken(sessionToken);
  if (!session) return unauthorizedResponse("token invalid");

  const user = await getUserBySession(session);
  if (!user) return unauthorizedResponse("session invalid");

  return user;
};

const getSessionHelper = async (
  sessionToken: string | undefined
): Promise<SafeUser | null> => {
  if (!sessionToken) return null;

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `session=${sessionToken}; SameSite=strict; Secure`
  );
  // ${baseURL()}/user?session=${sessionToken}
  const res = await fetch(`${baseURL()}/user`, {
    method: "GET",
    headers,
  });
  const data = await res.json();

  const parse = userSchema.safeParse(data.user);
  if (parse.success) return parse.data;
  console.log(parse.error);
  return null;
};

const getUserSession = async (): Promise<SafeUser | null> => {
  const cookieStore = cookies();

  const sessionToken = cookieStore.get("session")?.value;

  return getSessionHelper(sessionToken);
};

export {
  type SafeUser,
  generateSession,
  hashPassword,
  getUserBySession,
  createSessionOnUser,
  getSessionByToken,
  authenticationFlow,
  getUserSession,
};

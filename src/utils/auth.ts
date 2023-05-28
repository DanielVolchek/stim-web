import hash from "crypto-js/md5";
import { v4 as uuid } from "uuid";
import prisma from "./prisma";
import { User, Session } from "@prisma/client";

const generateSession = () => {
  return uuid();
};

const hashPassword = (pass: string) => {
  return hash(pass).toString();
};

const getSessionByToken = async (token: string) => {
  console.log("token: ", token);
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

export {
  generateSession,
  hashPassword,
  getUserBySession,
  createSessionOnUser,
  getSessionByToken,
};

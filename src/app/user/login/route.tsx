import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
  createSessionOnUser,
  generateSession,
  hashPassword,
} from "@/utils/auth";

// attempts to login a user
// if login is successful generate a token and respond with the token
export async function GET(req: Request) {
  const body = await req.json();

  const { username, password } = body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const passwordHash = hashPassword(password);

  if (user.passwordHash !== passwordHash) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // generate a new token
  const token = generateSession();

  // add token to user
  await createSessionOnUser(user, token);

  return NextResponse.json(
    { message: "Success", session: token, user: user },
    { status: 200 }
  );
}

// attempts to create a user
export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (user) {
    return NextResponse.json(
      { error: "Username is already in use" },
      { status: 409 }
    );
  }

  const validation = validateUsername(username);
  if (validation.errors) {
    return NextResponse.json(
      {
        error: "Username formatted incorrectly",
        validationErrors: validation.errors,
      },
      { status: 422 }
    );
  }

  const passwordHash = hashPassword(password);
  const sessionToken = generateSession();

  const newUser = await prisma.user.create({
    data: { username, passwordHash },
  });

  await createSessionOnUser(newUser, sessionToken);

  return NextResponse.json(
    { message: "Success", session: sessionToken, user: newUser },
    { status: 200 }
  );
}

const validateUsername = (username: string) => {
  //todo;
  let errors = "";
  const noWhiteSpace = /\s/.test(username);
  if (noWhiteSpace) errors += "Cannot Contain Whitespace;";
  return { errors };
};

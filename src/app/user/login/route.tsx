import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import hash from "crypto-js/md5";
import { v4 as uuid } from "uuid";

// attempts to login a user
export async function GET(req: Request) {
  const body = await req.json();
  const { token } = body;

  if (token) {
    const user = await prisma.user.findUnique({
      where: {
        sessionToken: token,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  }
  const { username, password } = body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const passwordHash = hash(password);

  if (user.passwordHash !== passwordHash.toString()) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json(
    { message: "Login successful", token: user.sessionToken },
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

  if (!validateUsername) {
    return NextResponse.json(
      { error: "Username validation failed" },
      { status: 422 }
    );
  }

  const passwordHash = hash(password).toString();
  const sessionToken = uuid();

  const newUser = await prisma.user.create({
    data: { username, passwordHash, sessionToken },
  });

  return NextResponse.json(
    { message: "Success", token: sessionToken },
    { status: 200 }
  );
}

const validateUsername = (username: string) => {
  //todo;
  return true;
};

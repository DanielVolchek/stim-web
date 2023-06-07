import { authenticationFlow } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const session = body.session;

  let user;
  try {
    user = await authenticationFlow(session);
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized: " + error },
      { status: 401 }
    );
  }

  await prisma.session.delete({ where: { token: body.session } });
  return NextResponse.json(
    { message: "Successfully logged out user" },
    { status: 200 }
  );
}

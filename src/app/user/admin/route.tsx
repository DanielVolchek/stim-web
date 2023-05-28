import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionByToken, getUserBySession } from "@/utils/auth";
import { Role } from "@prisma/client";

const unauthorizedResponse = (value: string) =>
  NextResponse.json({ error: "Unauthorized: " + value }, { status: 401 });

// check if user is admin
export async function POST(req: Request) {
  const body = await req.json();

  // const cookieStore = cookies();
  // console.log(cookieStore.getAll());
  // const sessionToken = cookieStore.get("session")?.value;

  const sessionToken = body.session;

  if (!sessionToken) return unauthorizedResponse("cookie");

  const session = await getSessionByToken(sessionToken);
  if (!session) return unauthorizedResponse("getbytoken");

  const user = await getUserBySession(session);
  if (!user) return unauthorizedResponse("getbysession");

  return NextResponse.json({ role: user.Role }, { status: 200 });
}

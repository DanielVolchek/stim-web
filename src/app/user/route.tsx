import { NextResponse } from "next/server";
import { authenticationFlow } from "@/utils/auth";

export async function POST(req: Request) {
  const body = await req.json();

  let user;
  try {
    user = await authenticationFlow(body.session);
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized: " + error },
      { status: 401 }
    );
  }

  let { passwordHash, ...safeUser } = user;
  return NextResponse.json({ ...safeUser }, { status: 200 });
}

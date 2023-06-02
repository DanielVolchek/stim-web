import { authenticationFlow } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  let user;
  try {
    user = await authenticationFlow(body);
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized: " + error },
      { status: 401 }
    );
  }
  return NextResponse.json({ user }, { status: 200 });
}

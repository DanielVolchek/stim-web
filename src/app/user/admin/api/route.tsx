import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.log("ERROR 500: Admin password not found in env");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const passedInPassword = body.password;

  if (!passedInPassword || passedInPassword !== adminPassword) {
    return NextResponse.json(
      { error: "Failed to validate password" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Validated password" }, { status: 200 });
}

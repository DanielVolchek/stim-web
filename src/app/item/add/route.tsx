import { authenticationFlow } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { session } = body;

  let user;
  try {
    user = await authenticationFlow(session);
    if (user.Role !== "ADMIN") throw new Error("Admin privileges required");
  } catch (err) {
    return NextResponse.json(
      { error: `Unauthorized: ${err}` },
      { status: 400 }
    );
  }

  const { image, name, desc, link } = body;

  if (!image || !name || !desc || !link) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  // add item
  // convert image to Image
  // upload to supabase
  // get url
  // upload via prisma
}

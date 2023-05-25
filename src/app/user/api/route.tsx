import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("hit route");
  const { username } = await req.json();
  console.log("username");
  if (!username)
    return NextResponse.json({
      status: 405,
      message: "Failed to provide username",
    });

  let results;
  const nonUniqueUsername = await prisma.user.findFirst({
    where: { username: username },
  });
  if (nonUniqueUsername)
    return NextResponse.json({
      status: 400,
      error: "Username must be unique, please enter a new username",
    });
  try {
    results = await prisma.user.create({ data: { username: username } });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      error: err,
    });
  }

  return NextResponse.json({
    status: 200,
    message: "User succesfully created",
  });
}

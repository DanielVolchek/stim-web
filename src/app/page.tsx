import Image from "next/image";
import UserModal from "@/components/UserModal";
import { cookies } from "next/dist/client/components/headers";
import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default async function Home() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("token");
  if (sessionToken)
    await fetch("/user/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: sessionToken }),
    });

  return (
    <main>
      <h1></h1>
    </main>
  );
}

import Image from "next/image";
import UserModal from "@/components/UserModal";
import { cookies } from "next/dist/client/components/headers";
import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default function Home() {
  const cookieStore = cookies();
  const username = cookieStore.get("username");
  const admin = cookieStore.get("admin");

  if (!username) return redirect("/user");
  if (admin) return redirect("/admin");

  const user = prisma.user.findUnique({ where: { username: username.value } });
  console.log(user);

  return (
    <main>
      <h1></h1>
      {username.value}
    </main>
  );
}

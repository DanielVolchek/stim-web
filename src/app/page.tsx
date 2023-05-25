import Image from "next/image";
import UserModal from "@/components/UserModal";
import { cookies } from "next/dist/client/components/headers";
import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  const username = cookieStore.get("username");

  if (!username) return redirect("/user");

  const user = prisma.user.findUnique({ where: { username: username.value } });
  console.log(user);
  return (
    <main>
      <h1></h1>
      {username.value}
    </main>
  );
}

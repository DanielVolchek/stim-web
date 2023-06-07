import { cookies } from "next/dist/client/components/headers";
import { getUserSession } from "@/utils/auth";
import LoginActionsContainer from "./LoginActionsContainer";
import Link from "next/link";

export default async function Nav() {
  console.log("cookies are ", cookies().get("session")?.value);

  const user = await getUserSession();
  const isAdmin = user?.role === "ADMIN";

  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        {isAdmin && <a href="/admin">Admin</a>}
        <LoginActionsContainer />
      </nav>
    </header>
  );
}

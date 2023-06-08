import Link from "next/link";
import { getUserSession } from "@/utils/auth";
import LoginActionsContainer from "./Auth/LoginActionsContainer";

export default async function Nav() {
  const user = await getUserSession();
  const isAdmin = user?.role === "ADMIN";

  return (
    <header>
      <nav className="flex justify-between border-b-4 border-black p-4">
        <Link href="/">Home</Link>
        {isAdmin && <a href="/admin">Admin</a>}
        <div className="flex">
          <LoginActionsContainer />
        </div>
      </nav>
    </header>
  );
}

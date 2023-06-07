import { getUserSession } from "@/utils/auth";
import LoginActionsContainer from "./LoginActionsContainer";

export default async function Nav() {
  const user = await getUserSession();
  const isAdmin = user?.role === "ADMIN";

  return (
    <header>
      <nav>
        <a href="/">Home</a>
        {isAdmin && <a href="/admin">Admin</a>}
        <LoginActionsContainer />
      </nav>
    </header>
  );
}

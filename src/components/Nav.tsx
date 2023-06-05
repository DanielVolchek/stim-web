import useUserStore from "@/utils/useUserStore";
import LoginActionsContainer from "./LoginActionsContainer";

export default async function Nav() {
  const user = useUserStore.getState().user;
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

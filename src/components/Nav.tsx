import useUserStore from "@/utils/useUserStore";

export default async function Nav() {
  const user = useUserStore.getState().user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <header>
      <nav>
        <a href="/">Home</a>
        {isAdmin && <a href="/admin">Admin</a>}
      </nav>
    </header>
  );
}

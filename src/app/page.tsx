import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

import URL from "@/utils/url";

export default async function Home() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (sessionToken) {
    const res = await fetch(`${URL}/user/admin`, {
      method: "POST",
      body: JSON.stringify({ session: sessionToken }),
    });

    const data = await res.json();
    if (data.error) return redirect("/login");
    if (data.user.role === "ADMIN") return <p>Admin</p>;
    return <p>User</p>;
  }

  redirect("/login");
}

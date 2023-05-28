import { cookies } from "next/dist/client/components/headers";
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import { redirect } from "next/navigation";
import { parse } from "path";

export default async function Home() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (sessionToken) {
    const res = await fetch("http://localhost:3000/user/admin", {
      method: "POST",
      body: JSON.stringify({ session: sessionToken }),
    });
    const data = await res.json();
    console.log(data);
    if (data.error) return <p>Error...</p>;
    if (data.role === "ADMIN") return <p>Admin</p>;
    return <p>User</p>;
  }

  redirect("/login");
}

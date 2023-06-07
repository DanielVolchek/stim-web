import baseURL from "@/utils/url";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { session: string };
};

export default async function Logout({ searchParams: { session } }: Props) {
  const cookieStore = cookies();
  // const session = cookieStore.get("session");

  if (!session) redirect("/");

  await fetch(`${baseURL()}/api/user/logout`, {
    method: "POST",
    body: JSON.stringify({ session }),
  });

  redirect("/");
}

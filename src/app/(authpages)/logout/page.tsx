import baseURL from "@/utils/url";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { session: string };
};

export default async function Logout({ searchParams: { session } }: Props) {
  if (!session) redirect("/");

  await fetch(`${baseURL()}/api/user/logout`, {
    method: "GET",
    headers: {
      Cookie: session,
    },
  });

  redirect(`${baseURL()}/`);
}

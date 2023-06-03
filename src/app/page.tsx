import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

import { getSession } from "@/utils/auth";

export default async function Home() {
  const cookieStore = cookies();

  const session = await getSession(cookieStore);
  if (!session) return redirect("/login");

  // if admin
  // redirect to /admin
  // or render page differently as if you're an admin
  // if rendering differently than create a zustand store for admin

  // fetch and render items down here
  // render items down here

  // if rented item render that on top of the page

  // render the rest of the items down here
  // item should be in a clickable card

  // after clicking redirect to item page

  // on item page
}

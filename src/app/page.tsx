import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

import { getSession } from "@/utils/auth";

import useUserStore from "@/utils/useUserStore";
import Test from "@/components/Test";

export default async function Home() {
  const setSession = async () => {
    const cookieStore = cookies();

    const session = cookieStore.get("session")?.value;

    const user = await getSession(session);

    if (!user) return redirect("/login");

    // set the user in the session
    useUserStore.setState({ user, session });
  };

  // const user = useUserStore.getState().user;
  if (!user) await setSession();
  return <Test />;

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

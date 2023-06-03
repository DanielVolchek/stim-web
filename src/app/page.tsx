import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

import { getURL } from "@/utils/url";
import { getSession } from "@/utils/auth";

export default async function Home() {
  const cookieStore = cookies();

  const session = await getSession(cookieStore);
}

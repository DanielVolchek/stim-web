import { getUserSession } from "@/utils/auth";
import LoginOrRegisterButtons from "./LoginButtons";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/dist/client/components/headers";

export default async function LoginActionsContainer() {
  const user = await getUserSession();

  if (user) {
    const session = cookies().get("session")?.value;
    return <LogoutButton session={session as string} />;
  }

  return <LoginOrRegisterButtons />;
}

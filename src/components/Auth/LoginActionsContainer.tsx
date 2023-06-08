import { getUserSession } from "@/utils/auth";
import LoginOrRegisterButtons from "./LoginButtons";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/dist/client/components/headers";

export default async function LoginActionsContainer() {
  const user = await getUserSession();

  if (user) {
    return <LogoutButton />;
  }

  return <LoginOrRegisterButtons />;
}

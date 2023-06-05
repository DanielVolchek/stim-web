import { getSession } from "@/utils/auth";
import LoginButtons from "./LoginButtons";

export default async function LoginActionsContainer() {
  const user = await getSession();

  return <LoginButtons user={user} />;
}

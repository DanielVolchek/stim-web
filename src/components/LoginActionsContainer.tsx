import { getUserSession } from "@/utils/auth";
import LoginButtons from "./LoginButtons";

export default async function LoginActionsContainer() {
  const user = await getUserSession();

  return <LoginButtons user={user} />;
}

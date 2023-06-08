import AuthenticationForm from "@/components/Form/AuthenticationForm";
import { getUserSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const user = await getUserSession();

  if (user) redirect("/");

  return <AuthenticationForm type={"register"} />;
}

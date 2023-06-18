import AuthenticationForm from "@/components/Form/AuthenticationForm";
import { getUserSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const user = await getUserSession();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl">Register</h1>
      <AuthenticationForm type={"register"} />
    </div>
  );
}

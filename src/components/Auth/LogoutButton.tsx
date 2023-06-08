"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AuthButtonWrapper from "./AuthButtonWrapper";

export default function LogoutButton({ session }: { session: string }) {
  const router = useRouter();

  // const session = Cookies.get("session");
  //
  // if (!session) router.push("/");

  const onClick = () => {
    Cookies.remove("session");
    router.push(`/logout?session=${session}`);
  };

  return (
    <div>
      <AuthButtonWrapper onClick={onClick} innerText="Logout" />
    </div>
  );
}

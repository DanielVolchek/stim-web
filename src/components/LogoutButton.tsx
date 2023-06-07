"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const LogoutButton = ({ session }: { session: string }) => {
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
      <button onClick={onClick}>{"Logout"}</button>
    </div>
  );
};

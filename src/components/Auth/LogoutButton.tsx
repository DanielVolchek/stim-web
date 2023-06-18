"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AuthButtonWrapper from "./AuthButtonWrapper";

export default function LogoutButton() {
  const router = useRouter();

  const onClick = () => {
    const session = Cookies.get("session");
    Cookies.remove("session");
    router.push(`/logout?session=${session}`);
  };

  return (
    <div>
      <AuthButtonWrapper onClick={onClick} innerText="Logout" />
    </div>
  );
}

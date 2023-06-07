"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const LoginOrRegisterButtons = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/login")}>Login</button>
      <button onClick={() => router.push("/register")}>Register</button>
    </div>
  );
};

"use client";

import { useRouter } from "next/navigation";
import AuthButtonWrapper from "./AuthButtonWrapper";

export default function LoginOrRegisterButtons() {
  const router = useRouter();

  return (
    <div>
      <AuthButtonWrapper
        onClick={() => router.push("/login")}
        innerText="Login"
      />
      <AuthButtonWrapper
        onClick={() => router.push("/register")}
        innerText="Register"
      />
    </div>
  );
}

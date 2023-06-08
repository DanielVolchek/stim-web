"use client";

import { useRouter } from "next/navigation";
import AuthButtonWrapper from "./AuthButtonWrapper";

export default function LoginOrRegisterButtons() {
  const router = useRouter();

  return (
    <div className="flex justify-between gap-4">
      <AuthButtonWrapper
        onClick={() => router.push("/register")}
        innerText="Register"
      />
      <AuthButtonWrapper
        onClick={() => router.push("/login")}
        innerText="Login"
        className="bg-copper !text-alabaster"
      />
    </div>
  );
}

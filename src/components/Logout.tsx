"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import baseURL from "@/utils/url";

export default function Logout() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch(`${baseURL()}/api/user/logout`);
    const data = await res.json();
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="rounded-md border-4 border-blue-400 px-8 py-4"
      >
        Logout
      </button>
    </form>
  );
}

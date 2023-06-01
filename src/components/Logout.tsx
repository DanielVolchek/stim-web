"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch("/user/logout");
    const data = await res.json();
    console.log(data);
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

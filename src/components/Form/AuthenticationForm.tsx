"use client";
import useUserStore from "@/utils/useUserStore";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";

import { FormEvent, useEffect, useState } from "react";

type Props = {
  type: "register" | "login";
};

export default function AuthenticationForm({ type }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // const [user, updateUser] = useUserStore((state) => [
  //   state.user,
  //   state.updateUser,
  // ]);

  const user = useUserStore((state) => state.user);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // TODO
    // this does register right now not login
    const res = await fetch(`/user/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();

    if (data.error) {
    }

    if (data.session) {
      cookie.set("session", data.session, { expires: 30, secure: true });
      router.push("/");
    }
  };

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [router, user]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={username}
        className="rounded-md border-black text-black"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        className="rounded-md border-black text-black"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="bg-red rounded-md px-4 py-2">
        Submit
      </button>
    </form>
  );
}

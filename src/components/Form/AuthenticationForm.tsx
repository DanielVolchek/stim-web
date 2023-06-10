"use client";
import baseURL from "@/utils/url";
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch(`${baseURL()}/api/user/${type}`, {
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
      cookie.set("session", data.session, {
        expires: 31,
        secure: true,
        sameSite: "Strict",
      });
      router.push("/");
      router.refresh();
    }
  };

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

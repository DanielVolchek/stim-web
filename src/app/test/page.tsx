"use client";
import cookie from "js-cookie";

import { FormEvent, useState } from "react";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch("/user/login", {
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

    if (data.token) {
      cookie.set("token", data.token);
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

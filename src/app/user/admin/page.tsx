"use client";
import { FormEvent, useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");

  const validatePassword = async () => {
    const res = await fetch("/user/admin/api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.error) {
      console.error(data.error);
      alert("Failed to login: " + data.error);
    }

    if (data.ok) {
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    validatePassword();
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

"use client";

import baseURL from "@/utils/url";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Logout() {
  const router = useRouter();

  const hitOnce = useRef(false);

  useEffect(() => {
    const session = Cookies.get("session") as string;

    if (hitOnce.current) return;

    fetch(`${baseURL()}/api/user/logout`, {
      method: "POST",
      body: JSON.stringify({ session }),
    }).then(() => {
      Cookies.remove("session");
      router.push("/");
    });

    hitOnce.current = true;
  });

  return <p>Loading...</p>;
}

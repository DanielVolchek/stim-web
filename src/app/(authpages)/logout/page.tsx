"use client";

import baseURL from "@/utils/url";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  searchParams: { session: string };
};

export default function Logout({ searchParams: { session } }: Props) {
  const router = useRouter();

  if (!session) router.push("/");

  useEffect(() => {
    (async () => {
      if (!session) return;
      await fetch(`${baseURL()}/api/user/logout`, {
        method: "GET",
        headers: {
          Cookie: session,
        },
      });

      router.push(`${baseURL()}/`);
    })();
  }, [session, router]);

  return <></>;
}

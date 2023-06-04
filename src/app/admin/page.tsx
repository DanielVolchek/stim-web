"use client";

import useUserStore from "@/utils/useUserStore";
import { redirect } from "next/navigation";

export default async function Admin() {
  const user = useUserStore.getState().user;

  if (!user) redirect("/");
  const role = user?.role;

  if (role !== "ADMIN") redirect("/");

  return <h1>You are an admin</h1>;
}

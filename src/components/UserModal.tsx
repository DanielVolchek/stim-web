"use client";

import Cookies from "js-cookie";
import { redirect } from "next/dist/server/api-utils";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserModal() {
  const [name, setName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const router = useRouter();

  const defineNewUser = async () => {
    Cookies.set("username", name);
    // TODO: define a user in prisma
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the terms to continue");
      return;
    }

    if (name.length < 2) {
      alert("Please enter your name to continue");
      return;
    }

    await defineNewUser();
    router.push("/");
  };

  return (
    // TODO: wrap in modal
    <div className="absolute left-0 top-0 z-0 flex h-screen w-screen items-center justify-center bg-gray-800">
      <form
        onSubmit={onSubmit}
        className="z-10 flex h-2/3 w-2/3 flex-col bg-white text-black"
      >
        <div>
          <label htmlFor="agreeToTerms">Agree To Terms</label>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={agreedToTerms}
            onChange={(_) => setAgreedToTerms(!agreedToTerms)}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName((_) => e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

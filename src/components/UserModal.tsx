"use client";

import Cookies from "js-cookie";
import { redirect } from "next/dist/server/api-utils";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

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
    <div className="">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="agreeToTerms">Agree To Terms</label>
          <input type="checkbox" name="agreeToTerms" />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="checkbox" name="name" />
        </div>
      </form>
    </div>
  );
}

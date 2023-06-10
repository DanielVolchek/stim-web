"use client";

import { Item, RentEvent } from "@prisma/client";
import { Image as ImageType } from "@prisma/client";
import { SafeUser } from "@/utils/auth";
import { MouseEventHandler, useEffect, useState } from "react";
import baseURL from "@/utils/url";
import Cookies from "js-cookie";

export default function RentButton({
  item,
  user,
}: {
  item: Item & { image: ImageType | null; currentRentEvent: RentEvent | null };
  user: SafeUser | null;
}) {
  const [action, setAction] = useState<"RENT" | "RETURN" | "RENTED">("RENT");

  const actionHandler = async () => {
    if (action === "RENTED") return null;

    const res = await fetch(`${baseURL()}/api/items/rent`, {
      method: "POST",
      body: JSON.stringify({ action, itemID: item.id }),
      headers: {
        Cookie: Cookies.get("session") as string,
      },
    });

    const data = await res.json();

    console.log(data);
    if (!data.error) setAction(action === "RENT" ? "RETURN" : "RENT");
  };

  useEffect(() => {
    if (item?.currentRentEvent) {
      setAction(
        user && item.currentRentEvent.rentedByID === user.id
          ? "RETURN"
          : "RENTED"
      );
    }
  }, [item, user]);

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (action === "RENTED")
      throw new Error("Button was clicked when item is already rented");
    actionHandler();
  };

  if (action === "RENTED") {
    return <span>Sorry this is already rented :(</span>;
  }

  return (
    <button
      onClick={onClickHandler}
      className="rounded-xl border-2 border-copper"
    >
      {action}
    </button>
  );
}

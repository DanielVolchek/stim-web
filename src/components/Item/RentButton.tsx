"use client";

import { Item, RentEvent } from "@prisma/client";
import { Image as ImageType } from "@prisma/client";
import { SafeUser } from "@/utils/auth";

export default function RentButton({
  item,
  user,
}: {
  item: Item & { image: ImageType | null; currentRentEvent: RentEvent | null };
  user: SafeUser | null;
}) {
  if (
    user &&
    item.currentRentEvent &&
    item.currentRentEvent.rentedByID === user.id
  ) {
  }

  return <button></button>;
}

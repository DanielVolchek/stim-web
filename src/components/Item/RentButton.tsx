"use client";

import { Item, RentEvent } from "@prisma/client";
import { SafeUser } from "@/utils/auth";

export default function RentButton({
  item,
  user,
}: {
  item: Item & { currentRentEvent: RentEvent };
  user: SafeUser;
}) {
  if (item.currentRentEvent.rentedByID === user.id) {
  }
}

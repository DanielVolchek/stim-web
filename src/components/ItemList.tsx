import { SafeUser, getUserSession } from "@/utils/auth";
import prisma from "@/utils/prisma";
import ItemCard from "./ItemCard";

export default async function ItemList() {
  const user = await getUserSession();

  const items = await prisma.item.findMany({
    include: { image: true, currentRentEvent: true },
  });

  return (
    <div>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

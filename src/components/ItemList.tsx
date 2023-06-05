import { SafeUser } from "@/utils/auth";
import prisma from "@/utils/prisma";
import ItemCard from "./ItemCard";

type Props = {
  user?: SafeUser | null;
};

export default async function ItemList({ user }: Props) {
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

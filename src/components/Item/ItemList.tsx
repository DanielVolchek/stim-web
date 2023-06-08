import { SafeUser, getUserSession } from "@/utils/auth";
import prisma from "@/utils/prisma";
import ItemCard from "./ItemCard";

export default async function ItemList() {
  const user = await getUserSession();

  const items = await prisma.item.findMany({
    include: { image: true, currentRentEvent: true },
  });

  let rentedID = user?.rentEvent?.itemID;

  let rentedItem;

  const itemsRendered = items.map((item) => {
    const renderedItem = <ItemCard key={item.id} item={item} />;

    if (item.id === rentedID || user) rentedItem = renderedItem;

    return renderedItem;
  });

  return (
    <div className="mx-auto my-4 flex w-1/2 flex-col gap-4">
      {rentedItem && (
        <>
          <h2>Rented: </h2>
          {rentedItem}
        </>
      )}
      {itemsRendered}
    </div>
  );
}

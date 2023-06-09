import { Item, RentEvent, Image as ImageType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import RentButton from "./RentButton";
import { getUserSession } from "@/utils/auth";

type Props = {
  item: Item & { image: ImageType | null; currentRentEvent: RentEvent | null };
};
export default async function ItemCard({ item }: Props) {
  const user = await getUserSession();

  return (
    <Link href={`/items/${item.id}`}>
      <div className="hoverEffect flex h-48 rounded-md border-2 border-celadon p-4 transition-all">
        <Image
          className="w-1/3 rounded-md"
          src={item.image?.url as string}
          alt={item.name}
          width={100}
          height={100}
        />
        <div className="flex basis-2/3 flex-col gap-4">
          <h3>{item.name}</h3>
          <p>{item.desc}</p>
        </div>

        {/* <RentButton item={item} user={user} /> */}
      </div>
    </Link>
  );
}

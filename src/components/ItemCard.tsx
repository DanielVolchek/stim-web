import { Item, RentEvent, Image as ImageType } from "@prisma/client";
import Image from "next/image";

type Props = {
  item: Item & { image: ImageType | null; currentRentEvent: RentEvent | null };
};
export default function ItemCard({ item }: Props) {
  return (
    <div className="">
      <h3>{item.name}</h3>
      <Image src={item.image?.url as string} alt={item.name} />
      <p>{Shorten(item.desc)}</p>
    </div>
  );
}

const Shorten = (str: string) => {
  const MAX_LENGTH = 50;
  return str.length > MAX_LENGTH ? str.substring(0, MAX_LENGTH) + "..." : str;
};

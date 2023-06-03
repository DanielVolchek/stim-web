import prisma from "@/utils/prisma";
type Props = { params: { id: string } };

export default async function Item({ params: { id } }: Props) {
  const item = await prisma.item.findUnique({ where: { id: parseInt(id) } });

  // on item page check if an item has been rented by the current user
  // if that is the case render a return item button

  return <p>{item?.name}</p>;
}

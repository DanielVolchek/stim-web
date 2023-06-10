import ServerItemList from "@/components/Item/ServerItemList";

export default async function Home() {
  return (
    <main>
      <h1 className="mt-2 text-center text-6xl">StimStore</h1>
      <ServerItemList />
    </main>
  );

  // return <ItemList />;
  // redirect to /admin
  // fetch and render items down here
  // render items down here
  // if rented item render that on top of the page
  // render the rest of the items down here
  // item should be in a clickable card
  // after clicking redirect to item page
  // on item page
}

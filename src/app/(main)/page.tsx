import { redirect } from "next/navigation";
import { SafeUser, getUserSession } from "@/utils/auth";
import ItemList from "@/components/ItemList";

export default async function Home() {
  return <div></div>;
  // return <ItemList />;
  // redirect to /admin
  // or render page differently as if you're an admin
  // if rendering differently than create a zustand store for admin
  // fetch and render items down here
  // render items down here
  // if rented item render that on top of the page
  // render the rest of the items down here
  // item should be in a clickable card
  // after clicking redirect to item page
  // on item page
}

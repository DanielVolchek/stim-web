import Image from "next/image";
import UserModal from "@/components/UserModal";
import { cookies } from "next/dist/client/components/headers";

export default function Home() {
  const cookieStore = cookies();
  const username = cookieStore.get("username");

  if (!username)
    return (
      <h1>
        <UserModal />
        <div></div>
      </h1>
    );
}

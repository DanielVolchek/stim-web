"use client";
import { useRouter } from "next/navigation";

import { SafeUser } from "@/utils/auth";
type Props = {
  user: SafeUser | null | undefined;
};

export default function LoginButtons({ user }: Props) {
  return (
    <div>
      {user ? (
        <ActionButton path="Logout" />
      ) : (
        <div>
          <ActionButton path="Login" />
          <ActionButton path="Register" />
        </div>
      )}
    </div>
  );
}

const ActionButton = ({ path }: { path: string }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/${path.toLowerCase()}`);
  };

  return <button onClick={onClick}>{path}</button>;
};

import useUserStore from "@/utils/useUserStore";

export default async function Test() {
  const user = useUserStore.getState().user;

  if (!user) return <p>loading...</p>;

  return <p>{user.username}</p>;
}

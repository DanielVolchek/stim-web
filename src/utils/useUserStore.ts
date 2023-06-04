import { create } from "zustand";
import { User } from "@prisma/client";

type State = {
  user: User | null;
};

type Actions = {
  updateUser: (user: User) => void;
import type { SafeUser } from "./auth";

type State = {
  user: SafeUser | null;
  session: string | null;
};

type Actions = {
  updateUser: (user: SafeUser) => void;
};

const useUserStore = create<State & Actions>((set) => ({
  user: null,
  updateUser: (user: User) => set(() => ({ user })),
  session: null,
  updateUser: (user: SafeUser) => set(() => ({ user })),
}));

export default useUserStore;

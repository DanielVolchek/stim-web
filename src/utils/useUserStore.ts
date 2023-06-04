import { create } from "zustand";
import { User } from "@prisma/client";

type State = {
  user: Omit<User, "passwordHash"> | null;
  session: string | null;
};

type Actions = {
  updateUser: (user: User) => void;
};

const useUserStore = create<State & Actions>((set) => ({
  user: null,
  session: null,
  updateUser: (user: User) => set(() => ({ user })),
}));

export default useUserStore;

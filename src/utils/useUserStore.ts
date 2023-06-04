import { create } from "zustand";
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
  session: null,
  updateUser: (user: SafeUser) => set(() => ({ user })),
}));

export default useUserStore;

import { create } from "zustand";

type State = {
  error: string;
};

type Actions = {
  updateError: (error: string) => void;
};

const useErrorStore = create<State & Actions>((set) => ({
  error: "",
  updateError: (updatedError: string) => {
    set(() => ({ error: updatedError }));
  },
}));

export default useErrorStore;

import { create } from "zustand";

interface IUseUpdateEmail {
  email: string;
  isUpdateEmail: boolean;
  toogleIsUpdateEmail: () => void;
  setFalseUpdateEmail: () => void;
  setEmail: (newEmail: string) => void;
}

const useUpdateEmail = create<IUseUpdateEmail>()((set) => ({
  email: "",
  isUpdateEmail: false,
  toogleIsUpdateEmail: () => {
    set((state) => ({ isUpdateEmail: !state.isUpdateEmail }));
  },
  setFalseUpdateEmail: () => {
    set(() => ({ isUpdateEmail: false }));
  },
  setEmail: (newEmail: string) => {
    set((state) => ({ email: (state.email = newEmail) }));
  },
}));

export default useUpdateEmail;

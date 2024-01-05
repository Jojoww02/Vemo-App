import { create } from "zustand";
import { IUpdateUser } from "@/api/types";

interface IUseUpdateProfile {
  dataUserToBeUpdate: IUpdateUser;
  setDataUserToBeUpdate: (newDataUserToBeUpdate: IUpdateUser) => void;
  isCanUpdateProfile: boolean;
  setIsCanUpdateProfile: (isCan: boolean) => void;
}

const useUpdateProfile = create<IUseUpdateProfile>()((set) => ({
  dataUserToBeUpdate: {
    userId: "",
    name: "",
    email: "",
  },
  setDataUserToBeUpdate: (newDataUserToBeUpdate: IUpdateUser) => {
    set(() => ({ dataUserToBeUpdate: newDataUserToBeUpdate }));
  },
  isCanUpdateProfile: false,
  setIsCanUpdateProfile: (isCan: boolean) => {
    set(() => ({ isCanUpdateProfile: isCan }));
  },
}));

export default useUpdateProfile;

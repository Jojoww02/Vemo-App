import { create } from "zustand";

interface useVehicleList {
  isVehicleListEnabled: boolean;
  setIsVehicleListEnabled: (condition: boolean) => void;
}

const useVehicleList = create<useVehicleList>()((set) => ({
  isVehicleListEnabled: false,
  setIsVehicleListEnabled: (condition: boolean): void => {
    set((state) => ({
      isVehicleListEnabled: (state.isVehicleListEnabled = condition),
    }));
  },
}));

export default useVehicleList;

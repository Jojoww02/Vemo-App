import { VehicleType } from "@/lib/types";
import { getVehicleImageByType } from "@/lib/utils/vehicle";

interface Props {
  type: VehicleType;
}

export default function VehicleIcon({ type }: Props): JSX.Element {
  return <img src={getVehicleImageByType(type)} alt="icon vehicle" className="w-28 md:w-26" />;
}

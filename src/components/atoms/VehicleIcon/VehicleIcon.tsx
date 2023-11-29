import { VehicleType } from "@/lib/types";
import { getVehicleImageByType } from "@/lib/utils";

interface Props {
  type: VehicleType;
}

export default function VehicleIcon({ type }: Props): JSX.Element {
  return <img src={getVehicleImageByType(type)} alt="icon vehicle" className="w-14 xs:w-16 md:w-24" />;
}

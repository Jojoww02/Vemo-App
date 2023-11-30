import { VehicleCondition } from "@/lib/types";
import { getVehicleCondition } from "@/lib/utils/vehicle";

interface Props {
  condition: number;
}

export default function VehicleCondition({ condition }: Props): JSX.Element {
  const { image, altImage, description }: VehicleCondition =
    getVehicleCondition(condition);
  return (
    <div className="flex items-center gap-1 xs:gap-2 md:gap-3">
      <img
        src={image}
        width={15}
        alt={altImage}
        className="xs:scale-110 md:scale-125 lg:scale-150"
      />
      <h4 className="text-[.6rem] md:text-xs xl:text-sm">{description}</h4>
    </div>
  );
}

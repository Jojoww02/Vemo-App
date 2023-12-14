import { Badge } from "@/components/ui/badge";
import { VehicleCondition } from "@/lib/types";
import { getVehicleCondition } from "@/lib/utils/vehicle";


interface BadgeProps {
    condition: number
  }

export default function BadgeStatus({ condition }: BadgeProps):JSX.Element {
  const { description }: VehicleCondition =
    getVehicleCondition(condition);
  return (
    <div>
      <Badge variant="default" className={`${condition <= 30 ? "bg-red-400" : condition <= 60 ? "bg-yellow-400" : "bg-green-400"}`}>{description}</Badge>
    </div>
  );
}

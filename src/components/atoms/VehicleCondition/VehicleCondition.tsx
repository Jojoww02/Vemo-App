import { cn, getVehicleCondition } from "@/lib/utils";

interface Props {
  condition: number;
}

export default function VehicleCondition({ condition }: Props): JSX.Element {
  const { color, description } = getVehicleCondition(condition);
  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-5 h-5 rounded-full ring-4", color)}></div>
      <h4 className="text-sm">{description}</h4>
    </div>
  );
}

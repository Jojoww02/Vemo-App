import BadgeStatus from "@/components/atoms/BadgeStatus";

interface DetailVehicleCardProps {
  title: string | undefined;
  image: string | undefined;
  condition: number
}

export default function DetailVehicleCard({ title, image, condition }: DetailVehicleCardProps) {
  return (
    <div className="flex gap-4 mt-10 relative">
      <img src={`/VectorImgParts/${image}.svg`} alt="" className="w-16 lg:w-24" />
      <div className="flex flex-col">
        <p className="font-bold text-xl">{`${title} Motor`}</p>
        <BadgeStatus condition={condition}/>
      </div>
    </div>
  );
}

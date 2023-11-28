import { TooltipIcon } from "@/components/atoms";
import { FeatureCard, VehicleCard } from "@/components/molecules";
import { IconCircleArrowUpRightFilled } from "@tabler/icons-react";

import request from "@/assets/dashboard/requestVeh.png";
import register from "@/assets/dashboard/registerVeh.png";

const carData = [
  { id: 1, name: "Beat Honda 2021", plate: "B 1234 SBO", status: "Good " },
  { id: 2, name: "Beat Honda 2021", plate: "B 1234 SBO", status: "Good " },
];

interface FeatureData {
  image: string;
  title: string;
}

const featuresData: FeatureData[] = [
  {
    image: request,
    title: "Request Perawatan",
  },
  {
    image: register,
    title: "Daftarkan Kendaraan Anda",
  },
];

export default function DashboardPage(): JSX.Element {
  return (
    <>
      <div className="bg-[#898989] p-7 rounded-2xl px-10 relative shadow-[0px_0px_7px_#00000040]">
        <div className="absolute right-2 top-2">
          <TooltipIcon text="View All Vehicles">
            <IconCircleArrowUpRightFilled
              size={27}
              className="text-white hover:scale-125 duration-500"
            />
          </TooltipIcon>
        </div>
        <div className="flex justify-between gap-6">
          {carData.map((car) => (
            <VehicleCard vehicleData={car} key={car.id} />
          ))}
        </div>
      </div>
      <div className="flex items-center w-full mt-5 gap-10 mb-10">
        {featuresData.map((feature, index) => (
          <FeatureCard
            image={feature.image}
            title={feature.title}
            key={index}
          />
        ))}
      </div>
    </>
  );
}

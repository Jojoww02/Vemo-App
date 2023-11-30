import { Tooltip } from "@/components/atoms";
import { FeatureCard, VehicleCard } from "@/components/molecules";
import { IconCircleArrowUpRightFilled } from "@tabler/icons-react";
import { featuresData, vehicleData } from "@/lib/data";

export default function DashboardPage(): JSX.Element {
  return (
    <>
      <div className="relative p-4 md:p-7 md:px-10 rounded-2xl shadow-[0px_0px_7px_#00000040] bg-[#898989]">
        <div className="hidden md:block absolute right-2 top-2">
          <Tooltip text="View All Vehicles">
            <IconCircleArrowUpRightFilled
              size={27}
              className="text-white hover:scale-125 duration-500"
            />
          </Tooltip>
        </div>
        <div className="flex flex-col xs:px-8 md:px-0 md:flex-row justify-between gap-4 md:gap-6">
          {vehicleData.map((vehicle) => (
            <VehicleCard vehicleData={vehicle} key={vehicle.id} />
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center w-full mt-5 gap-5 md:gap-10 mb-10">
        {featuresData.map((feature, index) => (
          <FeatureCard
            image={feature.image}
            title={feature.title}
            key={index}
            path={feature.path}
          />
        ))}
      </div>
    </>
  );
}

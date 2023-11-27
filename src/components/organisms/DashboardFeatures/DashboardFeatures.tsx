import * as React from "react";

import { FeatureCard } from "@/components/molecules";

import request from "@/assets/dashboard/requestVeh.png";
import register from "@/assets/dashboard/registerVeh.png";

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

const DashboardFeatures: React.FC = () => {
  return (
    <div className="flex items-center w-full mt-5 gap-10 mb-10">
      {featuresData.map((feature, index) => (
        <FeatureCard image={feature.image} title={feature.title} key={index} />
      ))}
    </div>
  );
};

export default DashboardFeatures;

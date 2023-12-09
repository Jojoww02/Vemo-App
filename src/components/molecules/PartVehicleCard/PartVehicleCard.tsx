import React from "react";
import selectImage from "../../../assets/select.svg";
import selectButtonImage from "../../../assets/selectButton.svg";

interface PartVehicleCardProps {
  title: string | undefined;
  condition: number;
  image: string | undefined;
  showCircle?: string | boolean;
}

export default function PartVehicleCard({ title, image, condition, showCircle }: PartVehicleCardProps) {
  return (
    <div className="w-full flex xl:w-[30rem] h-[6.7rem] xl:h-[7rem] xl:px-5 xl:p-2 px-2 p-2 my-2 rounded-[0.50rem] bg-white shadow-[0px_2px_7px_5px_#00000040] cursor-pointer">
      <img src={`/VectorImgParts/${image}.svg`} alt="" className="" />
      <div className="relative flex flex-col px-5 w-full font-semibold text-dark xl:text-3xl text-2xl">
        <h1>{title} Motor</h1>
        <p className="font-normal xl:text-lg text-xl">Kondisi {title} Motor</p>
        <img src={selectImage} alt="" className="absolute top-1 right-1 md:top-1 md:right xl:right-1" />

        <img src={selectButtonImage} alt="" className="absolute top-[.85rem] right-[.75rem] xl:right-3" />
        <div className="flex items-center py-1">
          <div className="xl:w-[17rem] w-[15rem] h-2 bg-slate-600 rounded-full">
            <div className={`h-2 rounded-full ${condition <= 30 ? "bg-red-400" : condition <= 60 ? "bg-yellow-400" : "bg-green-400"}`} style={{ width: `${condition?.toString()}%` }}></div>
          </div>
          <p className="font-normal xl:text-lg text-sm px-2">{condition}%</p>
        </div>
      </div>
    </div>
  );
}

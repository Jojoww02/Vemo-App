import React from "react";
import { useNavigate } from "react-router-dom";

import IconArrow from "../../assets/notification/Icon-arrow.svg";
import { REQUEST_MAINTENANCE_VEHICLE_PAGE } from "@/lib/constants/routes";
import { componentsData } from "@/lib/data";
import PartVehicleCard from "@/components/molecules/PartVehicleCard";

interface VehiclePartsPageProps {
  showCircle?: string | undefined;
}

export default function VehiclePartsPage({ showCircle }: VehiclePartsPageProps) {
  const [iShowCircle, setIsShowCircle] = React.useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleClickSelectAll = () => {
    setIsShowCircle((prevShowCircle) => !prevShowCircle);
  };

  return (
    <div className="w-full relative">
      <div className="pt-5 px-10  w-full mb-5">
        <div className=" w-[5rem]">
          <img src={IconArrow} alt="" className="absolute top-6 left-0 lg:left-5 xl:w-[2rem] xl:h-[2rem] w-[1.5rem] h-[1.5rem] cursor-pointer" onClick={() => navigate(REQUEST_MAINTENANCE_VEHICLE_PAGE)} />
        </div>
        <div className="flex justify-center font-bold xl:text-4xl text-3xl">
          <h1 className="">Conditional</h1>
        </div>
      </div>
      <div className="relative">
        <button className="absolute right-0 -top-14 items-center text-white bg-primary rounded-lg px-2 py-1" onClick={handleClickSelectAll}>
          Select All
        </button>
        <div className="flex w-full">
          <div className="w-full flex flex-wrap lg:justify-evenly pt-5 gap-2">
            {componentsData.map((component, index) => (
              <PartVehicleCard key={index} title={component?.name} condition={component?.condition} image={component?.name} showCircle={iShowCircle ? showCircle : undefined} />
            ))}
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="flex place-items-center pt-7 px-96">
        <button type="button" className="py-3 text-white rounded-md text-base bg-primary xl:text-lg font-medium w-full" onClick={onOpenModal}>
          Request Perawatan
        </button>
      </div>

      {/* <Modal open={open} center>
        <div className="flex flex-col items-center justify-center gap-7">
          <h1 className="modal py-8 text-center font-semibold text-3xl">Form Request Perawatan</h1>
          <input className="w-[80%] outline-none py-4 text-black relative border-[1px] border-secondary rounded-lg p-1 px-4 font-medium text-lg" type="text" placeholder="Email/No.telp" />
          <input className="w-[80%] outline-none py-4 text-black relative border-[1px] border-secondary rounded-lg p-1 px-4 font-medium text-lg" type="text" placeholder="Kilometer Awal" />
          <textarea className="w-[80%] input-type outline-none pb-40 py-4 text-black relative border-[1px] border-secondary rounded-lg p-1 px-4 font-medium text-lg" placeholder="Notes For Mechanic" />
          <div className="flex w-[50%] grid-cols-2 pb-5 space-x-3">
            <Button bgColor="primary" title="Request Perawatan" />
            <button className="py-3 text-white bg-dark rounded-md text-base xl:text-lg font-medium w-[60%]" onClick={onCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal> */}
    </div>
  );
}

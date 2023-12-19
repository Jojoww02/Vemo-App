import React from "react";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import PartVehicleCard from "@/components/molecules/PartVehicleCard";
import { useNavigate, useParams } from "react-router-dom";

import { REQUEST_MAINTENANCE_VEHICLE_PAGE } from "@/lib/constants/routes";
import { Button, Input } from "@/components/atoms";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { IParts, IUserResponse } from "@/api/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getVehiclePartsConditionFn } from "@/api/services/vehicle";
interface RequestMaintenanceVehicle {
  emailAndPhoneNumber: string;
  distanceVehicle: string;
  notesMechanic: string;
}

export default function VehiclePartsPage(): JSX.Element {
  const methods = useForm<RequestMaintenanceVehicle>();
  const { vehicleId } = useParams();

  const onSubmitHandler: SubmitHandler<RequestMaintenanceVehicle> = async (data) => {
    console.log("Form Data", data);

    const selectedCheckboxes = conditionArray
    ?.filter((part, index) => part.partName !== undefined)
    .map((part, index) => ({
      id: index + 1,
      partsId: part.partId,
      name: part.partName,
      checked: checkboxStates?.[index] || false,
    }));

    console.log("Selected Checkboxes:", selectedCheckboxes);

    const listPartId = selectedCheckboxes
      ?.filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.partsId);

    console.log("listPartId:", listPartId);

    const requestData = {
      contact: data.emailAndPhoneNumber,
      description: data.notesMechanic,
      vehicleId: vehicleId,
      listPartId: listPartId || [],
    };

    console.log("Backend Request Data:", requestData);
  };

  const { data: user } = useQuery<IUserResponse>({ queryKey: ["me"] });

  const { data: conditionArray } = useQuery<IParts[], Error>({
    queryKey: ["parts", vehicleId],
    queryFn: async () => await getVehiclePartsConditionFn(vehicleId),
  });

  const navigate = useNavigate();

  const [checkboxStates, setCheckboxStates] = React.useState(conditionArray?.map(() => false));
  const [selectAllText, setSelectAllText] = React.useState("Pilih Semua");

  const handleClickSelectAll = () => {
    setCheckboxStates((prevCheckboxStates) => {
      const allSelected = prevCheckboxStates?.every((state) => state);
      const newCheckboxStates = prevCheckboxStates?.map(() => !allSelected, {
        /* ? false : componentsData[index]?.condition < 60 */
      });
      setSelectAllText(allSelected ? "Pilih Semua" : "Batal");
      return newCheckboxStates;
    });
  };

  const handleCheckboxChange = (index: number) => {
    setCheckboxStates((prevCheckboxStates) => {
      const newCheckboxStates = [...(prevCheckboxStates as boolean[])];
      newCheckboxStates[index] = !newCheckboxStates[index];
      setSelectAllText("Pilih Semua");
      return newCheckboxStates;
    });
  };

  return (
    <div className="w-full relative">
      <div className="pt-5 px-10  w-full mb-5">
        <div className=" w-[5rem]">
          <img src={IconArrow} alt="" className="absolute top-6 left-0 lg:left-5 xl:w-[2rem]  md:w-32 xl:h-[2rem] w-[1.4rem] h-[1.5rem] cursor-pointer" onClick={() => navigate(REQUEST_MAINTENANCE_VEHICLE_PAGE)} />
        </div>
        <div className="flex justify-center font-bold md:text-4xl xl:text-4xl text-3xl">
          <h1 className="">Kondisi Part</h1>
        </div>
      </div>
      <div className="relative">
        <button className="absolute -right-1 -top-[3.2rem] md:-top-10 lg:-top-16 items-center text-[10px] xs:text-base md:text-lg text-white bg-primary rounded-lg px-2 py-[6px] xs:py-1" onClick={handleClickSelectAll}>
          {selectAllText}
        </button>
        <div className="flex w-full">
          <div className="w-full flex flex-wrap lg:justify-evenly pt-5 gap-2">
            {conditionArray?.map((part, index) => (
              <PartVehicleCard key={index} title={part.partName} condition={part.condition} image={part.partName} checked={checkboxStates?.[index] ?? false} onCheckboxChange={() => handleCheckboxChange(index)} />
            ))}
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="w-full flex place-items-center pt-7 px-14 xs:px-24 sm:px-20 lg:px-48 mb-10">
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" className="py-3 text-white rounded-md text-base bg-primary xl:text-lg font-medium w-full">
              Request Perawatan
            </button>
          </DialogTrigger>
          <DialogContent className="sm:w-[500px] sm:h-[500px] bg-white">
            <DialogHeader className="flex flex-col items-center justify-center">
              <DialogTitle className="text-2xl font-semibold">Form Request Perawatan</DialogTitle>
              <DialogDescription className="text-center">
                Silahkan isi form berikut untuk merequest perawatan kendaraan
              </DialogDescription>
            </DialogHeader>
              <div className="w-full flex flex-col px-7">
                <FormProvider {...methods}>
                  <form
                    autoComplete="off"
                    className="flex flex-col gap-5"
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                  >
                  <Input
                    defaultValue={(user as IUserResponse).email}
                    name="emailAndPhoneNumber" 
                    label="Email/Phone Number" 
                    isFill={methods.watch().emailAndPhoneNumber} 
                    placeholder="Enter Email/Phone Number" 
                    type="text" 
                  />
                  <Input 
                    name="notesMechanic" 
                    label="Notes for Mechanic" 
                    isFill={methods.watch().notesMechanic} 
                    placeholder="Enter Notes for Mechanic" 
                    type="text" 
                  />
                  <Button type="submit" className="py-6 mt-4 text-lg font-semibold">
                    Kirim
                  </Button>
                </form>
              </FormProvider>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

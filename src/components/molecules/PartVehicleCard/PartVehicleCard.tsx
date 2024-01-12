import { IConditionParts, IMaintenanceParts } from "@/api/types";
import { Button, Input } from "@/components/atoms";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconEditCircle } from "@tabler/icons-react";
import { FormProvider, useForm } from "react-hook-form";

interface PartVehicleCardProps {
  data: IConditionParts;
  maintenanceData?: IMaintenanceParts;
  checked: boolean;
  onCheckboxChange: () => void;
  isCheck: boolean;
  isAdmin: boolean;
}

export default function PartVehicleCard(props: PartVehicleCardProps) {
  const { data, maintenanceData, checked, onCheckboxChange, isCheck, isAdmin } =
    props;
  const methods = useForm<{ editMaintenanceDate: Date }>();

  const onSubmitHandler = (value: { editMaintenanceDate: Date }) => {
    console.log({
      editMaintenanceDate: new Date(value.editMaintenanceDate).toISOString(),
      partId: data.partId,
    });
  };

  return (
    <div className="w-full flex xl:w-[30rem] h-[6.7rem] xl:h-[7rem] xl:px-5 xl:p-2 px-2 p-2 my-2 rounded-[0.50rem] bg-white shadow-[0px_2px_7px_5px_#00000040] cursor-pointer">
      <img
        src={`/${data.partName?.toLowerCase()}.svg`}
        alt=""
        className="w-16 xs:w-20 sm:w-24 md:w-28"
      />
      <div className="relative flex flex-col justify-center px-5 w-full font-semibold text-dark">
        <h1 className="text-[0.9rem] sm:text-lg md:text-xl">
          {data.partName} Motor
        </h1>
        {isAdmin ? (
          <div className="font-normal text-[1rem] ">
            <p>perawatan: Rp. {maintenanceData?.maintenanceFinalPrice}</p>
            <p>jasa: Rp. {maintenanceData?.maintenanceServiceFinalPrice}</p>
          </div>
        ) : (
          <p className="font-normal text-[0.8rem] sm:text-lg xl:text-lg">
            Kondisi {data.partName} Motor
          </p>
        )}
        {isCheck && (
          <div className="flex gap-4 items-center absolute top-1 right-8">
            <Dialog>
              <DialogTrigger asChild>
                <button type="button">
                  <IconEditCircle />
                </button>
              </DialogTrigger>
              <DialogContent className="w-4/5">
                <DialogHeader className="flex flex-col items-center justify-center">
                  <DialogTitle className="text-2xl font-semibold">
                    Mengedit
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Silahkan kapan terakhir anda services parts ini
                  </DialogDescription>
                </DialogHeader>
                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                    className="flex flex-col justify-center"
                  >
                    <Input
                      type="date"
                      placeholder="silahkan edit"
                      name="editMaintenanceDate"
                      label="Edit"
                      id={data.partId}
                    />
                    <div className="flex justify-center mt-10 w-full">
                      <Button type="submit" className="text-base">
                        Kirim
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </DialogContent>
            </Dialog>
            {!isAdmin && data.condition <= 60 && (
              <Checkbox
                id={`checkbox-${data.partId}`}
                onCheckedChange={onCheckboxChange}
                checked={checked}
                className="w-6 h-6 md:w-8 md:h-8"
              />
            )}
          </div>
        )}

        <div className="flex items-center py-1">
          <div className="w-full h-2 bg-slate-600 rounded-full">
            <div
              className={`h-2 rounded-full ${
                data.condition <= 30
                  ? "bg-red-400"
                  : data.condition <= 60
                  ? "bg-yellow-400"
                  : "bg-green-400"
              }`}
              style={{ width: `${data.condition?.toString()}%` }}
            ></div>
          </div>
          <p className="font-normal xl:text-lg text-sm px-2">
            {data.condition}%
          </p>
        </div>
      </div>
    </div>
  );
}

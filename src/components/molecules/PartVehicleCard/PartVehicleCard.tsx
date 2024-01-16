import {
  IConditionParts,
  IMaintenanceParts,
  IMaintenanceVehicle,
} from "@/api/types";
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
import useMutateVehicle from "@/hooks/mutations/useMutateVehicle";
import { IconEditCircle } from "@tabler/icons-react";
import { FormProvider, useForm } from "react-hook-form";

interface PartVehicleCardProps {
  conditiondata: IConditionParts;
  maintenancePartData?: IMaintenanceParts;
  maintenanceVehicleData?: IMaintenanceVehicle;
  checked?: boolean;
  onCheckboxChange?: () => void;
  isCheck?: boolean;
  isAdmin?: boolean;
  isEdit?: boolean;
}

export default function PartVehicleCard(props: PartVehicleCardProps) {
  const {
    conditiondata,
    maintenancePartData,
    checked,
    onCheckboxChange,
    isCheck,
    isAdmin,
    isEdit,
  } = props;

  const { partPrice } = useMutateVehicle();

  const methods = useForm<any>();

  const onSubmitHandlerDate = (value: { editMaintenanceDate: Date }) => {
    console.log({
      editMaintenanceDate: new Date(value.editMaintenanceDate).toISOString(),
      partId: conditiondata?.partId,
    });
  };

  const onHandleEditPrice = async (data: { newPrice: number }) => {
    // console.log();
    await partPrice.mutateAsync({
      ...data,
      maintenancePartId: maintenancePartData?.id,
    });
  };

  return (
    <div className="w-full relative flex xl:w-[30rem] h-[6.7rem] xl:h-[7rem] xl:px-5 xl:p-2 px-2 p-2 my-2 rounded-[0.50rem] bg-white shadow-[0px_2px_7px_5px_#00000040] cursor-pointer">
      <img
        src={`/${conditiondata?.partName?.toLowerCase()}.svg`}
        alt=""
        className="w-16 xs:w-20 sm:w-24 md:w-28"
      />
      <div className="relative flex flex-col justify-center px-5 w-full font-semibold text-dark">
        <h1 className="text-[0.9rem] sm:text-lg md:text-xl">
          {conditiondata?.partName} Motor
        </h1>
        {isAdmin ? (
          <div className="font-normal text-[1rem] ">
            <p>perawatan: Rp. {maintenancePartData?.maintenanceFinalPrice}</p>
            <p>jasa: Rp. {maintenancePartData?.maintenanceServiceFinalPrice}</p>
          </div>
        ) : (
          <p className="font-normal text-[0.8rem] sm:text-lg xl:text-lg">
            Kondisi {conditiondata?.partName} Motor
          </p>
        )}
        {isCheck && (
          <div className="flex gap-4 items-center absolute top-1 right-8">
            {!isAdmin && conditiondata?.condition <= 60 && (
              <Checkbox
                id={`checkbox-${conditiondata?.partId}`}
                onCheckedChange={onCheckboxChange}
                checked={checked}
                className="w-6 h-6 md:w-8 md:h-8"
              />
            )}
          </div>
        )}

        {conditiondata?.condition <= 60 && (
          <>
            {!isAdmin && isEdit ? (
              <Dialog>
                <DialogTrigger asChild className="absolute top-2 right-20">
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
                      onSubmit={methods.handleSubmit(onSubmitHandlerDate)}
                      className="flex flex-col justify-center"
                    >
                      <Input
                        type="date"
                        placeholder="silahkan edit"
                        name="editMaintenanceDate"
                        label="Edit"
                        id={conditiondata?.partId}
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
            ) : (
              <Dialog>
                <DialogTrigger asChild className="absolute top-2 right-20">
                  {isEdit && (
                    <button type="button">
                      <IconEditCircle />
                    </button>
                  )}
                </DialogTrigger>
                <DialogContent className="w-4/5">
                  <DialogHeader className="flex flex-col items-center justify-center">
                    <DialogTitle className="text-2xl font-semibold">
                      Mengedit
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Silahkan requetst
                    </DialogDescription>
                  </DialogHeader>
                  <FormProvider {...methods}>
                    <form
                      onSubmit={methods.handleSubmit(onHandleEditPrice)}
                      className="flex flex-col justify-center"
                    >
                      <Input
                        type="number"
                        placeholder="Silahkan masukan harga baru"
                        name="newPrice"
                        label="Perbarui harga"
                        id={conditiondata?.partId}
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
            )}
          </>
        )}

        <div className="flex items-center py-1">
          <div className="w-full h-2 bg-slate-600 rounded-full">
            <div
              className={`h-2 rounded-full ${
                conditiondata?.condition <= 30
                  ? "bg-red-400"
                  : conditiondata?.condition <= 60
                  ? "bg-yellow-400"
                  : "bg-green-400"
              }`}
              style={{ width: `${conditiondata?.condition?.toString()}%` }}
            ></div>
          </div>
          <p className="font-normal xl:text-lg text-sm px-2">
            {conditiondata?.condition}%
          </p>
        </div>
      </div>
    </div>
  );
}

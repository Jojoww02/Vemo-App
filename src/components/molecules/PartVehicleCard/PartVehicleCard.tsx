
interface PartVehicleCardProps {
  title: string | undefined;
  condition: number;
  image: string | undefined;
  showCircle?: string | boolean;
  checked: boolean;
  onCheckboxChange: () => void;
}

export default function PartVehicleCard({ title, image, condition, checked, onCheckboxChange }: PartVehicleCardProps) {
  return (
    <div className="w-full flex xl:w-[30rem] h-[6.7rem] xl:h-[7rem] xl:px-5 xl:p-2 px-2 p-2 my-2 rounded-[0.50rem] bg-white shadow-[0px_2px_7px_5px_#00000040] cursor-pointer">
      <img src={`/VectorImgParts/${image}.svg`} alt="" className="w-16 xs:w-20 sm:w-24 md:w-28" />
      <div className="relative flex flex-col px-5 w-full font-semibold text-dark">
        <h1 className="text-lg md:text-2xl xl:text-3xl ">{title} Motor</h1>
        <p className="font-normal text-lg xl:text-lg ">Kondisi {title} Motor</p>
        <input 
          type="checkbox" 
          className="absolute top-2 right-8 border-hidden rounded-full h-5 w-5 cursor-pointer"
          onChange={onCheckboxChange}
          checked={checked}
        />
        <div className="flex items-center py-1">
          <div className="xl:w-[17rem] w-[11rem] xs:w-[18rem] sm:w-[17rem] md:w-[34rem] h-2 bg-slate-600 rounded-full">
            <div className={`h-2 rounded-full ${condition <= 30 ? "bg-red-400" : condition <= 60 ? "bg-yellow-400" : "bg-green-400"}`} style={{ width: `${condition?.toString()}%` }}></div>
          </div>
          <p className="font-normal xl:text-lg text-sm px-2">{condition}%</p>
        </div>
      </div>
    </div>
  );
}

import { BarLoader } from "react-spinners";

export default function FullScreenLoader() {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <img src="/loading-icon.svg" width={120} alt="" />
        <div>
          <p className="text-center text-xs pb-2">Otw . . .</p>
          <BarLoader color="#F4B400" width={150} />
        </div>
      </div>
    </div>
  );
}

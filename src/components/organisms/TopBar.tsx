import { IconBellFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="bg-white w-full h-12 mb-2 sticky top-0 flex justify-between items-center px-9 z-50">
      <Link to={"/"}>
        <h1 className="font-bold text-[#F4B400] text-2xl italic">Dashboard</h1>
      </Link>
      <div className="relative">
        <IconBellFilled size={25} />
        <div className="bg-red-600 h-3 w-3 rounded-full absolute right-0 -top-1"></div>
      </div>
    </header>
  );
}

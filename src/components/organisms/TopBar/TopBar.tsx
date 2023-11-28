import { NotificationIcon } from "@/components/atoms";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="bg-white w-full h-20 mb-2 sticky top-0 flex justify-between items-center px-9">
      <Link to={"/"}>
        <h1 className="font-bold text-[#F4B400] text-3xl italic">Dashboard</h1>
      </Link>
      <NotificationIcon notificationCount={12} />
    </header>
  );
}

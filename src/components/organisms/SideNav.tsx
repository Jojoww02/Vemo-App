import { Link } from "react-router-dom";
import { IconLayoutDashboard, IconMotorbike } from "@tabler/icons-react";

export default function SideNav() {
  return (
    <nav className="w-20 rounded-xl my-5 border-2 shadow-md flex flex-col justify-center items-center">
      <Link to="/">
        <IconLayoutDashboard size={30} />
      </Link>
      <Link to="/vehicles">
        <IconMotorbike size={30} />
      </Link>
    </nav>
  );
}

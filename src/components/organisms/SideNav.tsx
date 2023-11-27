import * as React from "react";
import { Link } from "react-router-dom";
import { IconHistory, IconInfoCircle, IconLayoutDashboard, IconMotorbike, IconSquareRoundedChevronLeftFilled, IconSquareRoundedChevronRightFilled } from "@tabler/icons-react";

export default function SideNav() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex">
      <div className={`rounded-xl my-5 border-2 shadow-md p-5 pt-8 ${open ? "w-72" : "w-28"} duration-300 relative`}>
        <div className="absolute -right-5 mt-5 cursor-pointer bg-white text-[#898989]"
          onClick={() => setOpen(!open)}
        >
          {open ? <IconSquareRoundedChevronLeftFilled size={40} /> : <IconSquareRoundedChevronRightFilled size={40} />}
        </div>
      </div>
    </div>
  );
}

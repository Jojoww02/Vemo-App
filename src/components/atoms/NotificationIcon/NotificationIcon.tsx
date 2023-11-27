import * as React from "react";
import { IconBellFilled } from "@tabler/icons-react";

const NotificationIcon: React.FC = () => {
  return (
    <div className="relative cursor-pointer">
      <IconBellFilled size={40} style={{ color: "#898989" }} />
      <span className="bg-red-600 h-5 w-5 rounded-full absolute right-0 -top-1 text-white text-xs font-semibold flex justify-center items-center">
        9+
      </span>
    </div>
  );
};

export default NotificationIcon;

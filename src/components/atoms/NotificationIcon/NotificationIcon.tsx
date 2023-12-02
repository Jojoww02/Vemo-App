import { NOTIFICATION_PAGE } from "@/lib/constants/routes";
import { IconBellFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface IProps {
  notificationCount?: number;
}

export default function NotificationIcon(props: IProps): JSX.Element {
  const { notificationCount } = props;
  return (
    <div className="relative cursor-pointer">
     <Link to={NOTIFICATION_PAGE}>
     <IconBellFilled size={30} className="text-[#898989] lg:scale-110" />
     </Link>
      {notificationCount && (
        <span className="bg-red-600 h-5 w-5 rounded-full absolute -right-1 -top-1 text-white text-[.65rem] font-semibold flex justify-center items-center">
          {notificationCount > 9 ? "9+" : notificationCount}
        </span>
      )}
    </div>
  );
}

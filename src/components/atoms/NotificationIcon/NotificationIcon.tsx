import { IconBellFilled } from "@tabler/icons-react";

interface IProps {
  notificationCount?: number;
}

export default function NotificationIcon(props: IProps): JSX.Element {
  const { notificationCount } = props;
  return (
    <div className="relative cursor-pointer">
      <IconBellFilled size={30} className="text-[#898989] lg:scale-110" />
      {notificationCount && (
        <span className="bg-red-600 h-5 w-5 rounded-full absolute -right-1 -top-1 text-white text-[.65rem] font-semibold flex justify-center items-center">
          {notificationCount > 9 ? "9+" : notificationCount}
        </span>
      )}
    </div>
  );
}

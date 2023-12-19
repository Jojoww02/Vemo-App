import { useNavigate } from "react-router-dom";
import MailIcon from "../../../assets/notification/Icon-mail.svg";
import { NOTIFICATION_DETAILS_PAGE } from "@/lib/constants/routes";
import { Checkbox } from "@/components/ui/checkbox";
import { INotificationResponse } from "@/api/types";
import useMutateNotification from "@/hooks/useMutateNotification";

interface NotificationCardProps {
  data: INotificationResponse;
  deleteMode: boolean;
  checked: boolean;
  onCheckboxChange: () => void;
}

export default function NotificationCard(props: NotificationCardProps) {
  const { data, deleteMode, checked, onCheckboxChange } = props;
  const navigate = useNavigate();

  const { readNotification } = useMutateNotification();

  const handleNotificationClick = async () => {
    await readNotification.mutateAsync([data.id]);
  };

  if (readNotification.isSuccess) {
    navigate(NOTIFICATION_DETAILS_PAGE(data.id));
  }

  return (
    <div className={`w-full ${!data.read ? "bg-[#f4b4004c]" : "bg-[#ECECEC]"} flex flex-col xl:h-[32%] 2xl:h-[21%] h-[22%] mb-5 cursor-pointer relative`}>
      <div className="absolute top-2 right-5 md:right-8 border-hidden rounded-full h-5 w-5 cursor-pointer">
        {deleteMode && <Checkbox id={`checkbox-${data.id}`} onCheckedChange={onCheckboxChange} checked={checked} className="w-6 h-6 md:w-8 md:h-8" />}
      </div>
      <div onClick={handleNotificationClick}>
        <div className="flex mt-3 px-4 lg:px-10 ">
          <img src={MailIcon} alt="" className="w-4 lg:w-6" />
          <p className="px-2 font-extralight text-dark text-xs lg:text-base">Mail • {data.createdAt}</p>
        </div>
        <div className="flex flex-col gap-2 px-4 lg:px-10">
          <p className="font-semibold text-dark text-sm sm:text-lg md:text-xl lg:text-2xl">{data.title}</p>
          <p className="lg:text-base text-xs sm:text-base md:text-lg sm font-normal pb-3">{data.description}</p>
        </div>
      </div>
    </div>
  );
}

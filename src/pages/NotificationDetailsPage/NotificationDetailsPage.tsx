import IconArrow from "../../assets/notification/Icon-arrow.svg";
import MailIcon from "../../assets/notification/Icon-mail copy.svg";
import { useNavigate, useParams } from "react-router-dom";
import { NOTIFICATION_PAGE } from "@/lib/constants/routes";
import { useQuery } from "@tanstack/react-query";
import { getNotificationsDetailsFn } from "@/api/services/notification";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function NotificationDetailPage(): JSX.Element {
  const navigate = useNavigate();
  const { notificationId } = useParams();

  const { data: notification, isSuccess } = useQuery({
    queryKey: ["notifications", notificationId],
    queryFn: async () => await getNotificationsDetailsFn(notificationId),
  });

  return (
    <div className="md:w-[640px] md:mx-auto mb-10 rounded">
      {isSuccess && notification ? (
        <>
          <div className="flex flex-col">
            <img src={IconArrow} alt="" className="lg:w-[1rem] w-4 cursor-pointer" onClick={() => navigate(NOTIFICATION_PAGE)} />
            <h1 className="lg:mt-10 mt-4 font-semibold lg:text-2xl">{notification.title}</h1>
            <button type="button" className="flex items-center justify-center font-regular rounded-lg bg-primary text-white text-1xl w-[4rem] h-[2rem] mt-5 cursor-default">
              Inbox
            </button>
          </div>
          <div className="flex flex-row mt-8 items-center">
            <img src={MailIcon} alt="" className="lg:w-[1.5rem] w-6" />
            <p className="px-5 font-extralight text-base lg:text-lg">Mail dari {notification.category} • {notification.createdAt && format(new Date(notification.createdAt), "dd MMMM yyyy", { locale: id })} </p>
          </div>
          <div className="rounded-xl p-4 py-5 pb-6 mt-5 relative rounded-l-lg bg-[#E8ECF4]">
            <h2 className="font-regular text-base lg:text-lg">{notification.description}</h2>
          </div>
        </>
      ) : (
        <p>Notifikasi tidak ditemukan</p>
      )}
    </div>
  );
}

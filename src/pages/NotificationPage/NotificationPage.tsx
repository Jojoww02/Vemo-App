import React from "react";
import { NotificationCard } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { notificationData } from "@/lib/data";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils/style";
import { useQuery } from "@tanstack/react-query";
import { getNotificationsFn } from "@/api/services/notification";
import useMutateNotification from "@/hooks/useMutateNotification";
import { IUserResponse } from "@/api/types";
import { useToast } from "@/components/ui/use-toast";
import { NOTIFICATION_DETAILS_PAGE } from "@/lib/constants/routes";
import { useNavigate } from "react-router-dom";

export default function NontificationPage(): JSX.Element {
  const [activeTabEmail, setActiveTabEmail] = React.useState("");
  const [deleteMode, setDeleteMode] = React.useState(false);
  const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);

  const { toast } = useToast();
  const { data: user } = useQuery({ queryKey: ["me"] });
  const { deleteNotifications } = useMutateNotification();

  const {
    data: notifications,
    isSuccess,
    refetch: refetchNotification,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => await getNotificationsFn(),
  });

  let notificationUnread: string[] = [];

  if (notifications) {
    notifications.forEach((notification) => {
      if (!notification.read) {
        notificationUnread.push(notification.id);
      }
    });
  }

  const { readNotification } = useMutateNotification();

  const handleMarkAllRead = async () => {
    await readNotification.mutateAsync(notificationUnread);
  };

  if (readNotification.isSuccess) {
    refetchNotification();
  }

  // console.log("data", notifications);

  const handleDelete = async () => {
    await deleteNotifications.mutateAsync({
      userId: (user as IUserResponse).userId,
      listNotificationId: checkedItems,
    });
  };

  React.useEffect(() => {
    if (deleteNotifications.isSuccess) {
      refetchNotification();
      if (checkedItems.length > 0) {
        toast({
          title: "Success",
          description: "Berhasil menghapus notification",
        });
      }

      setDeleteMode(false);
      setCheckedItems([]);
    }
  }, [deleteNotifications.isSuccess]);

  const tabs = [
    {
      name: "Unread",
      id: "unread",
    },
  ];

  function handleCategoryClick(tabId: string) {
    if (tabId === activeTabEmail) {
      setActiveTabEmail("");
    } else {
      setActiveTabEmail(tabId);
    }
  }

  function handleDeleteOptionClick() {
    // reset checkedItems when cancel delete
    if (deleteMode) {
      setCheckedItems([]);
    }
    setDeleteMode(!deleteMode);
  }

  const handleCheckboxChange = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems((prev) => prev.filter((item) => item !== id));
    } else {
      setCheckedItems((prev) => [...prev, id]);
    }
  };

  const handleSelectAll = () => {
    const allIds = notifications!.map((data) => data.id);
    setCheckedItems(selectAll ? [] : allIds);
    setSelectAll((prev) => !prev);
  };

  return (
    <div className="md:w-[640px] md:mx-auto mb-10 ">
      <div className="flex flex-col w-full items-center">
        <div className="w-full">
          <h1 className="font-semibold text-xl lg:text-3xl xl:text-4xl">Inbox Notifikasi</h1>

          <div className="flex justify-between w-full mt-5 mb-10">
            <div className="flex gap-2 sm:gap-4 items-center ">
              <p className="text-base sm:text-lg lg:text-xl font-normal">Kategori</p>
              {tabs.map((tab, index) => (
                <button
                  type="button"
                  onClick={() => handleCategoryClick(tab.id)}
                  key={index}
                  className={`text-[10px] sm:text-sm rounded-lg border-2 py-1 px-4 lg:px-7 ${tab.id === activeTabEmail ? "bg-[#F4B400] border-[#F4B400] text-white" : "border-[#F4B400] text-[#F4B400]  "}`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-6">
              {deleteMode && <Trash2 size={30} onClick={handleDelete} className={cn(checkedItems.length > 0 && "text-red-600")} />}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 w-9 p-0 bg-slate-200 lg:bg-white">
                    <span className="sr-only">Open menu</span>
                    <DotsVerticalIcon className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-xs sm:text-base md:text-lg">
                  {deleteMode ? (
                    <React.Fragment>
                      <DropdownMenuItem onClick={handleSelectAll}>
                        <p>Pilih semua</p>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleDeleteOptionClick}>
                        <p>Batal</p>
                      </DropdownMenuItem>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <DropdownMenuItem onClick={handleMarkAllRead}>
                        <p>Tandai semua telah dibaca</p>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleDeleteOptionClick}>
                        <p>Pilih untuk hapus</p>
                      </DropdownMenuItem>
                    </React.Fragment>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      {isSuccess && notifications && notifications.length > 0 ? (
        activeTabEmail == "unread" ? (
          <>
            <div className="flex flex-col pt-2 overflow-y-auto">
              {notifications
                .filter((data) => data.read === false)
                .map((data) => (
                  <NotificationCard key={data.id} data={data} deleteMode={deleteMode} checked={checkedItems.includes(data.id)} onCheckboxChange={() => handleCheckboxChange(data.id)} />
                ))}
            </div>
            {notifications.filter((data) => data.read === false).length === 0 && (
              <div className="flex flex-col items-center justify-center text-center">
                <img src="/mail.svg" alt="" className="w-[20rem] h-[20rem]" />
                <h1 className="font-semibold text-dark text-3xl mb-5">Tidak ada notif nih!</h1>
                <p className="font-normal text-dark tex-1xl">Inbox kamu sedang kosong</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-[72%] flex-col pt-2 overflow-y-auto">
            {notifications.map((data) => (
              <NotificationCard key={data.id} data={data} deleteMode={deleteMode} checked={checkedItems.includes(data.id)} onCheckboxChange={() => handleCheckboxChange(data.id)} />
            ))}
          </div>
        )
      ) : (
        // ketika notification kosong
        <div className="flex flex-col items-center justify-center text-center">
          <img src="/mail.svg" alt="" className="w-[20rem] h-[20rem]" />
          <h1 className="font-semibold text-dark text-3xl mb-5">Tidak ada notif nih!</h1>
          <p className="font-normal text-dark tex-1xl">Inbox kamu sedang kosong</p>
        </div>
      )}
    </div>
  );
}

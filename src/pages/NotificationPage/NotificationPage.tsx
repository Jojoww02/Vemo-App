import React from "react";
import { NotificationCard } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notificationData } from "@/lib/data";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils/style";

export default function NontificationPage(): JSX.Element {
  const [activeTabEmail, setActiveTabEmail] = React.useState("");
  const [deleteMode, setDeleteMode] = React.useState(false);
  const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);

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
    const allIds = notificationData.map((data) => data.id);
    setCheckedItems(selectAll ? [] : allIds);
    setSelectAll((prev) => !prev);
  };

  return (
    <div className="md:w-[640px] md:mx-auto mb-10 ">
      <div className="flex flex-col w-full items-center">
        <div className="w-full">
          <h1 className="font-semibold text-xl xl:text-4xl">
            Inbox Notifikasi
          </h1>

          <div className="flex justify-between w-full mt-5 mb-10">
            <div className="flex gap-2">
              <p className="lg:text-base font-normal">Kategori</p>
              {tabs.map((tab, index) => (
                <button
                  type="button"
                  onClick={() => handleCategoryClick(tab.id)}
                  key={index}
                  className={`rounded-lg border-2 px-4 lg:px-7 ${
                    tab.id === activeTabEmail
                      ? "bg-[#F4B400] border-[#F4B400] text-white"
                      : "border-[#F4B400] text-[#F4B400]  "
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-6">
              {deleteMode && (
                <Trash2
                  size={30}
                  onClick={() => console.log(checkedItems)}
                  className={cn(checkedItems.length > 0 && "text-red-600")}
                />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-9 w-9 p-0 bg-slate-200 lg:bg-white"
                  >
                    <span className="sr-only">Open menu</span>
                    <DotsVerticalIcon className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="text-xs sm:text-base md:text-lg"
                >
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
                      <DropdownMenuItem>
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
      {activeTabEmail == "unread" ? (
        <div className="flex flex-col pt-2 overflow-y-auto">
          {notificationData
            .filter((data) => data.status === 0)
            .map((data) => (
              <NotificationCard
                key={data.id}
                data={data}
                deleteMode={deleteMode}
                checked={checkedItems.includes(data.id)}
                onCheckboxChange={() => handleCheckboxChange(data.id)}
              />
            ))}
        </div>
      ) : (
        // ketika inbox kosong
        // <div className="flex flex-col items-center justify-center text-center">
        //   <img src={InboxIcon} alt="" className="w-[20rem] h-[20rem]"/>
        //   <h1 className="font-semibold text-dark text-3xl mb-5">No Inbox Notification!</h1>
        //   <p className="font-normal text-dark tex-1xl">Your Inbox Is Empty</p>
        // </div>
        <div className="flex h-[72%] flex-col pt-2 overflow-y-auto">
          {notificationData.map((data) => (
            <NotificationCard
              key={data.id}
              data={data}
              deleteMode={deleteMode}
              checked={checkedItems.includes(data.id)}
              onCheckboxChange={() => handleCheckboxChange(data.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

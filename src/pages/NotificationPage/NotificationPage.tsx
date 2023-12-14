import { NotificationCard } from "@/components/molecules";
import { notificationData } from "@/lib/data";
import { useState } from "react";

export default function NontificationPage(): JSX.Element {
  const [activeTabEmail, setActiveTabEmail] = useState("");

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

  return (
    <div className="md:w-[640px] md:mx-auto mb-10 ">
      <div className="flex flex-col w-full items-center">
        <div className="w-full">
          <h1 className="font-semibold text-xl xl:text-5xl">
            Inbox Notifikasi
          </h1>
          <div className="flex flex-row gap-2 mt-5 mb-10">
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
            <div className="flex w-full justify-end">
              <button className="text-xs lg:text-base font-normal">
                <a className="hover:text-primary">Tandai semua telah di baca</a>
              </button>
            </div>
          </div>
        </div>
      </div>
      {activeTabEmail == "unread" ? (
        <div className="flex flex-col pt-2 overflow-y-auto">
          {notificationData
            .filter((data) => data.status === 0)
            .map((data) => (
              <NotificationCard key={data.id} data={data} />
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
            <NotificationCard key={data.id} data={data} />
          ))}
        </div>
      )}
    </div>
  );
}

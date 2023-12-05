
import { NotificationCard } from "@/components/molecules";
import Notification from "@/components/molecules/Notification";
import { notificationData } from "@/lib/data";
import { useState } from "react";

export default function NontificationPage(): JSX.Element {
  const [activeTabEmail, setActiveTabEmail] = useState("");
  return (
    <div className="md:w-[640px] md:mx-auto mb-10 ">
      <Notification activeTabEmail={activeTabEmail} setActiveTabEmail={setActiveTabEmail}/>
      {activeTabEmail == "unread" ? (
        <div className="flex flex-col pt-10 overflow-y-auto">
            {notificationData
                .filter((data => data.status === 0 ))
                .map(data => (
                    <NotificationCard key={data.id} data={data}/>
                ))
            }
        </div>
      ) : (
        // <div className="flex flex-col items-center justify-center text-center">
        //   <img src={InboxIcon} alt="" className="w-[20rem] h-[20rem]"/>
        //   <h1 className="font-semibold text-dark text-3xl mb-5">No Inbox Notification!</h1>
        //   <p className="font-normal text-dark tex-1xl">Your Inbox Is Empty</p>
        // </div>
        <div className="flex h-[72%] flex-col pt-10 overflow-y-auto">
            {notificationData.map((data) =>(
                <NotificationCard key={data.id} data={data}  />
            ))}
        </div>
      )}
    </div>
  )
}

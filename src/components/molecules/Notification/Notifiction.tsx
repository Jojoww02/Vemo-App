import React, { Dispatch, SetStateAction } from 'react';


interface NotificationProps {
  activeTabEmail: string; // Assuming activeTabEmail is a string, adjust if it has a different type
  setActiveTabEmail: Dispatch<SetStateAction<string>>;
}

const Notification: React.FC<NotificationProps> = ({ activeTabEmail, setActiveTabEmail }) => {
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
    <div className="flex flex-col w-full items-center">
      <div className="w-full pt- ">
        <h1 className="font-semibold text-xl xl:text-5xl">Inbox Notification</h1>
        <div className="flex flex-row gap-2 mt-5 mb-10">
          <p className="lg:text-base font-normal">Category</p>
          {tabs.map((tab, index) => (
            <button
              type='button'
              onClick={() => handleCategoryClick(tab.id)}
              key={index}
              className={`rounded-lg border-2 px-4 lg:px-7 ${tab.id === activeTabEmail ? "bg-[#F4B400] border-[#F4B400] text-white" : "border-[#F4B400] text-[#F4B400]  "}`}
            >
              {tab.name}
            </button>
          ))}
          <div className="flex w-full justify-end">
            <button className="text-xs lg:text-base font-normal">
              <a className="hover:text-primary">Mark All As Read</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
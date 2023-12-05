import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IUser } from "@/api/types";
import { VERIFY_PASSWORD_PAGE } from "@/lib/constants/routes";
import UserProfileIcon from "../../assets/profile/user-profile-icon.svg";
import {
  IconLock,
  IconLogout2,
  IconMailFilled,
  IconPencil,
  IconUser,
} from "@tabler/icons-react";

export default function ProfilePage(): JSX.Element {
  const { data: user } = useQuery<IUser>({ queryKey: ["me"] });

  return (
    <div className="flex gap-10 mt-10 mb-5">
      {/* left content */}
      <div className="w-1/2 flex flex-col ">
        <div className="h-80 flex flex-col bg-[#EFEFEF] rounded-xl items-center justify-center">
          <img src={UserProfileIcon} alt="" className="w-40 mb-12 " />
          <Link
            to={VERIFY_PASSWORD_PAGE}
            className="flex text-[#0586BE] text-lg font-medium items-center cursor-pointer hover:underline"
          >
            <IconPencil size={25} />
            <span>Update Profile</span>
          </Link>
        </div>
        <div className="h-32 flex flex-col mt-10 bg-[#EFEFEF] rounded-xl justify-center px-10 gap-5">
          <Link to={""} className="flex text-[#0586BE] text-lg font-medium items-center gap-2 cursor-pointer hover:underline">
            <IconLock size={25} />
            <span>Change Password</span>
          </Link>
          <button className="flex text-lg font-medium items-center gap-2 hover:underline">
            <IconLogout2 size={25} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
      {/* right content */}
      <div className="w-1/2 flex flex-col">
        <div className="h-[30.5rem] flex flex-col bg-[#EFEFEF] rounded-xl justify-center px-10 xl:px-20">
          <h1 className="text-2xl font-semibold">Biodata</h1>
          <div className="flex flex-col mt-10 gap-3">
            <div className="flex items-center gap-2">
              <IconUser size={30} />
              <span className="font-regular text-lg">Name</span>
            </div>
            <span className="font-medium text-xl ml-1">
              {(user as IUser).name}
            </span>
            <div className="flex items-center mt-4 gap-2 ml-1">
              <IconMailFilled size={30} />
              <span className="font-regular text-lg">Email</span>
            </div>
            <span className="font-medium text-xl ml-1">
              {(user as IUser).email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

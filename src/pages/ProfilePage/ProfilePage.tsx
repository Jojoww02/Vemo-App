import { IconLock, IconLogout2, IconMailFilled, IconPencil, IconUser } from "@tabler/icons-react";
import UserProfileIcon from "../../assets/profile/user-profile-icon.svg";
import { useNavigate } from "react-router-dom";
import { PROFILE_PAGE } from "@/lib/constants/routes";

export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="flex gap-10 mt-10">
      {/* left content */}
      <div className="w-1/2 flex flex-col ">
        <div className="h-80 flex flex-col bg-[#EFEFEF] rounded-xl items-center justify-center">
          <img src={UserProfileIcon} alt="" className="w-40 mb-12 "/>
          <div className="flex text-[#0586BE] text-lg font-medium items-center cursor-pointer">
            <IconPencil size={25}/>
            <span>Update Profile</span>
          </div>
        </div>
        <div className="h-32 flex flex-col mt-10 bg-[#EFEFEF] rounded-xl justify-center px-10 gap-5">
          <div className="flex text-[#0586BE] text-lg font-medium items-center gap-2">
            <IconLock size={30} className="cursor-pointer"/>
            <span className="cursor-pointer">Change Password</span>
          </div>
          <div className="flex text-lg font-medium items-center gap-2 ">
            <IconLogout2 size={30} className="cursor-pointer"/>
            <span className="cursor-pointer">Log Out</span>
          </div>
        </div>
      </div>
      {/* right content */}
      <div className="w-1/2 flex flex-col">
        <div className="h-[30.5rem] flex flex-col bg-[#EFEFEF] rounded-xl justify-center px-10 xl:px-20">
          <h1 className="text-2xl font-semibold">Biodata</h1>
          <div className="flex flex-col mt-10 gap-3">
            <div className="flex items-center gap-2">
              <IconUser size={30}/>
              <span className="font-regular text-lg">Name</span>
            </div>
            <span className="font-medium text-xl ml-1">Putra Eka Satrya</span>
            <div className="flex items-center mt-4 gap-2 ml-1">
              <IconMailFilled size={30}/>
              <span className="font-regular text-lg">Email</span>
            </div>
            <span className="font-medium text-xl ml-1">putraekasatrya@email.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

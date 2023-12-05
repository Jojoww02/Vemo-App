import { IconLock, IconLogout2, IconMailFilled, IconPencil, IconUser } from "@tabler/icons-react";
import UserProfileIcon from "../../assets/profile/user-profile-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { CHANGE_PASSWORD_PAGE, CONFIRMATION_PASSWORD_PAGE, PROFILE_PAGE } from "@/lib/constants/routes";
import { useQuery } from "@tanstack/react-query";
import useMobileResponsive from "@/hooks/useMobileResponsive";
import { ProfilePageMobile } from "@/mobile";
import useLogoutUser from "@/hooks/useLogoutUser";

interface UserData {
  name: string;
  email: string;
}
export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useQuery<UserData>({ queryKey: ["me"] });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching user data</p>;
  }

  // console.log(user);

  const isMobileResponsive = useMobileResponsive();
  const { handleLogoutUser } = useLogoutUser();

  return (
    <>
      {isMobileResponsive ? (
        <div className="flex gap-10 mt-10 mb-5">
          {/* left content */}
          <div className="w-1/2 flex flex-col ">
            <div className="h-80 flex flex-col bg-[#EFEFEF] rounded-xl items-center justify-center">
              <img src={UserProfileIcon} alt="" className="w-40 mb-12 " />
              <Link to={CONFIRMATION_PASSWORD_PAGE} className="flex text-[#0586BE] text-lg font-medium items-center cursor-pointer">
                <IconPencil size={25} />
                <span>Update Profile</span>
              </Link>
            </div>
            <div className="h-32 flex flex-col mt-10 bg-[#EFEFEF] rounded-xl justify-center px-10 gap-5">
              <Link to={CHANGE_PASSWORD_PAGE} className="flex text-[#0586BE] text-lg font-medium items-center gap-2">
                <IconLock size={30} className="cursor-pointer" />
                <span className="cursor-pointer">Change Password</span>
              </Link>
              <button type="button" className="flex text-lg font-medium items-center gap-2" onClick={handleLogoutUser}>
                <IconLogout2 size={30} className="cursor-pointer" />
                <span className="cursor-pointer">Log Out</span>
              </button>
            </div>
          </div>
          {/* right content */}
          <div className="w-1/2 items-start justify-center  flex flex-col">
            <div className=" flex flex-col bg-[#EFEFEF] rounded-xl justify-center h-[30.7rem] px-10 xl:px-20">
              <h1 className="text-2xl font-semibold">Biodata</h1>
              <div className="flex flex-col gap-4 mt-5">
                <div className="flex gap-2 ">
                  <IconUser size={30} />
                  <p className="font-regular text-lg">Name</p>
                </div>
                  <p className="font-medium text-xl ml-1">{user?.name}</p>
                <div className="flex gap-2 ml-1 ">
                  <IconMailFilled size={30} />
                  <p className="font-regular text-lg">Email</p>
                </div>
                  <p className="font-medium text-xl ml-1">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProfilePageMobile />
      )}
    </>
  );
}

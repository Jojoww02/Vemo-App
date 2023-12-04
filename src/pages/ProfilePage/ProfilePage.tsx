import { IconLock, IconLogout2, IconMailFilled, IconPencil, IconUser } from "@tabler/icons-react";
import UserProfileIcon from "../../assets/profile/user-profile-icon.svg";
import { useNavigate } from "react-router-dom";
import { CONFIMASI_PASSWORD_PAGE, PROFILE_PAGE } from "@/lib/constants/routes";

export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="md:w-[640px] md:mx-auto mb-10">
      <div className="flex-col flex ">
        <div className="flex flex-col items-center pt-5 gap-8">
          <h1 className="font-semibold text-4xl">Profile</h1>
          <img src={UserProfileIcon} alt="" className="w-20 xs:w-28 md:w-36 lg:w-40" />
          <button type="button" className="flex mt-3 text-[#0586BE] gap-1 items-center">
            <IconPencil />
            <span className=" text-lg  sm:text-sm">Update Profile</span>
          </button>
        </div>
      </div>
      <div className="px-4 xs:px-0">
        <div className="flex flex-col pt-5">
          <h1 className="font-semibold text-2xl  border-b pb-2 ">My Information</h1>
        </div>
        <div className="flex-col  mt-5 lg:relative">
          <div className="flex justify-between">
            <p className="font-semibold text-xl  ">Biodata</p>
          </div>
          <div className="flex justify-between">
            <button type="button" className="flex items-center space-x-3 mt-5  text-xl cursor-default">
              <span>
                <IconUser style={{ fontSize: "1.5rem" }} />
              </span>
              <span className="mt-1 text-base  font-medium">Name</span>
            </button>
          </div>
          <p className="mt-1 text-sm md:text-base">Putra Eka Satrya</p>
          <button type="button" className="flex items-center space-x-3 mt-7  text-lg cursor-default">
            <span>
              <IconMailFilled style={{ fontSize: "1rem" }} />
            </span>
            <p className="md:text-base font-medium ">Email</p>
          </button>
          <p className="mt-1 md:text-base">putraekasatrya@email.com</p>
          <div className="absolute bottom-10 lg:right-0 lg:top-0 bg-white">
            <button type="button" className="flex text-[#0586BE] gap-2 items-center" onClick={() => navigate(PROFILE_PAGE)}>
              <IconLock />
              <p className=" text-sm ">Change Password</p>
            </button>
            <button
              type="button"
              className="mt-3 flex gap-2  items-center"
            >
              <IconLogout2 style={{ fontSize: "1.3rem" }} />
              <p className="font-medium text-sm">Log Out</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

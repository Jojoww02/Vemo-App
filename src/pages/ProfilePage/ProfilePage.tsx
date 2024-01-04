import React from "react";
import useMobile from "@/hooks/useMobile";
import { ProfilePageMobile } from "@/mobile";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IUserResponse } from "@/api/types";
import {
  CHANGE_PASSWORD_PAGE,
  FORGOT_PASSWORD_REQUEST_PAGE,
  VERIFY_PASSWORD_PAGE,
} from "@/lib/constants/routes";
import {
  IconLock,
  IconLogout2,
  IconMailFilled,
  IconPencil,
  IconUser,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { KeyRound } from "lucide-react";
import useLogoutUser from "@/hooks/useLogoutUser";

export default function ProfilePage(): JSX.Element {
  const isMobile = useMobile();
  const { data: user } = useQuery<IUserResponse>({ queryKey: ["me"] });
  const { handleLogoutUser } = useLogoutUser();

  return (
    <React.Fragment>
      {isMobile ? (
        <main className="flex mt-10 gap-10 mb-5 text-dark">
          {/* Left Content Start */}
          <div className="w-1/2 flex flex-col">
            <div className="h-80 flex flex-col bg-milk rounded-xl items-center justify-center">
              <Avatar className="w-36 h-36 my-8">
                <AvatarImage src={`/PhotoProfile/${user?.photo}`} />
                <AvatarFallback>
                  <img src="/user-profile-icon.svg" alt="" />
                </AvatarFallback>
              </Avatar>
              <Link
                to={VERIFY_PASSWORD_PAGE}
                className="flex text-[#0586BE] text-lg font-medium items-center cursor-pointer hover:underline gap-1"
              >
                <IconPencil size={25} />
                <span>Update Profile</span>
              </Link>
            </div>
            <div className="h-44 flex flex-col mt-10 bg-milk rounded-xl justify-center px-10 gap-5">
              <Link
                to={CHANGE_PASSWORD_PAGE}
                className="flex text-[#0586BE] text-lg font-medium items-center gap-2 cursor-pointer hover:underline"
              >
                <IconLock size={25} />
                <span>Ubah Password</span>
              </Link>
              <Link
                to={FORGOT_PASSWORD_REQUEST_PAGE}
                className="flex text-[#0586BE] text-lg font-medium items-center gap-2 cursor-pointer hover:underline"
              >
                <KeyRound size={25} />
                <span>Lupa Password</span>
              </Link>
              <button
                className="flex text-lg font-medium items-center gap-2 hover:underline"
                onClick={handleLogoutUser}
              >
                <IconLogout2 size={25} />
                <span>Keluar</span>
              </button>
            </div>
          </div>
          {/* Left Content End */}

          {/* Right Content Start */}
          <div className="w-1/2 flex flex-col">
            <div className="flex flex-col h-full bg-milk rounded-xl justify-center px-10 xl:px-20">
              <h1 className="text-2xl font-semibold">Biodata</h1>
              <div className="flex flex-col mt-10 gap-3">
                <span className="flex items-center gap-2 text-lg">
                  <IconUser size={25} />
                  <p>Nama</p>
                </span>
                <p className="font-medium text-lg ml-1">
                  {(user as IUserResponse).name}
                </p>
                <span className="flex items-center mt-4 gap-2 ml-1 text-lg">
                  <IconMailFilled size={25} />
                  <p>Email</p>
                </span>
                <p className="font-medium text-lg ml-1">
                  {(user as IUserResponse).email}
                </p>
              </div>
            </div>
          </div>
          {/* Right Content End */}
        </main>
      ) : (
        <ProfilePageMobile />
      )}
    </React.Fragment>
  );
}

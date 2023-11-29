import { Button, NotificationIcon } from "@/components/atoms";
import { Link } from "react-router-dom";

import { Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function TopBar() {
  return (
    <header className="bg-white w-full h-20 mb-2 sticky top-0 flex justify-between items-center px-6 md:px-10 z-40">
      <span className="flex justify-center items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="text-slate-900 lg:hidden mr-4 xs:scale-125 lg:scale-150" />
          </SheetTrigger>
          <SheetContent className="w-72">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right">
                  Username
                </label>
                <input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Link to={"/"}>
          <h1 className="font-bold text-[#F4B400] text-xl xs:text-2xl lg:text-3xl italic">
            Dashboard
          </h1>
        </Link>
      </span>

      <NotificationIcon notificationCount={12} />
    </header>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function ActiveUsersCard() {
  return (
    <Card className="h-full py-4">
      <CardContent>
        <h1 className="text-xl font-bold text-gray-800 mb-5">Active Users</h1>
        <div className="flex flex-col gap-2">
          <div className="flex pl-4 gap-5 items-center hover:bg-slate-400/30 rounded-lg duration-300 py-2">
            <Avatar className="w-11 h-11">
              <AvatarImage src="/user-profile-icon.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-800">Eka</p>
              <p className="text-sm text-gray-600">eka@email.com</p>
            </div>
          </div>
          <div className="flex pl-4 gap-5 items-center hover:bg-slate-400/30 rounded-lg duration-300 py-2">
            <Avatar className="w-11 h-11">
              <AvatarImage src="/user-profile-icon.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-800">Eka</p>
              <p className="text-sm text-gray-600">eka@email.com</p>
            </div>
          </div>
          <div className="flex pl-4 gap-5 items-center hover:bg-slate-400/30 rounded-lg duration-300 py-2">
            <Avatar className="w-11 h-11">
              <AvatarImage src="/user-profile-icon.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-800">Eka</p>
              <p className="text-sm text-gray-600">eka@email.com</p>
            </div>
          </div>
          <div className="flex pl-4 gap-5 items-center hover:bg-slate-400/30 rounded-lg duration-300 py-2">
            <Avatar className="w-11 h-11">
              <AvatarImage src="/user-profile-icon.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-800">Eka</p>
              <p className="text-sm text-gray-600">eka@email.com</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

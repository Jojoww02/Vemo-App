import { getActiveUsersFn } from "@/api/services/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export default function ActiveUsersCard() {
  const { data, isSuccess } = useQuery({
    queryKey: ["activeUser"],
    queryFn: async () => await getActiveUsersFn(),
    refetchInterval: 50 * 1000,
  });

  return (
    <Card className="h-full py-4">
      <CardContent>
        <h1 className="text-xl font-bold text-gray-800 mb-5">Active Users</h1>
        <div className="flex flex-col gap-2">
          {isSuccess &&
          data.filter((user) => user.role !== "admin").length > 0 ? (
            data
              .filter((user) => user.role !== "admin")
              .map((user) => (
                <div
                  key={user.userId}
                  className="flex pl-4 gap-5 items-center hover:bg-slate-400/30 rounded-lg duration-300 py-2"
                >
                  <Avatar className="w-11 h-11">
                    <AvatarImage src={`/PhotoProfile/${user?.photo}`} />
                    <AvatarFallback>
                      <img src="/user-profile-icon.svg" alt="" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-800">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-xs text-center">
              Tidak ada customer <br /> yang active
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

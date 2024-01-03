import "./AdminDashboardPage.scss";
import { Card, CardContent } from "@/components/ui/card";
import { ActiveUsersCard } from "./AdminDashboardCards";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Matic", value: 400, color: "#0088FE" },
  { name: "Manual", value: 300, color: "#00C49F" },
];

export default function AdminDashboardPage() {
  return (
    <main className="wrapper">
      <div className="box box1">
        <ActiveUsersCard />
      </div>
      <Card className="box box2">
        <CardContent>
          <p>Box 2</p>
        </CardContent>
      </Card>
      <Card className="box box3">
        <CardContent>
          <p>Box 3</p>
        </CardContent>
      </Card>
      <Card className="box box4">
        <CardContent className="py-4">
          <div className="h-full flex flex-col justify-between">
            <h1 className="text-2xl font-semibold text-center">
              Tipe Kendaraan
            </h1>
            <div className="flex items-center justify-center w-full h-full mt-10">
              <ResponsiveContainer width="99%" height={300}>
                <PieChart>
                  <Tooltip
                    contentStyle={{ background: "white", borderRadius: "5px" }}
                  />
                  <Pie
                    data={data}
                    innerRadius={"70%"}
                    outerRadius={"90%"}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 text-sm">
              {data.map((item) => (
                <div
                  className="flex flex-col gap-2 items-center"
                  key={item.name}
                >
                  <div className="flex gap-2 items-center">
                    <div
                      className={"w-2.5 h-2.5 rounded-full"}
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="box box5">
        <CardContent>
          <p>Box 5</p>
        </CardContent>
      </Card>
    </main>
  );
}

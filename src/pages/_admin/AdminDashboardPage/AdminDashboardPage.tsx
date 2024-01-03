import "./AdminDashboardPage.scss";
import { Card, CardContent } from "@/components/ui/card";
import { ActiveUsersCard } from "./AdminDashboardCards";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Matic", value: 400, color: "#0088FE" },
  { name: "Manual", value: 300, color: "#00C49F" },
];

const data2 = [
  { name: "Approve", value2: 200, color: "#F4B400" },
  { name: "Requested", value2: 300, color: "#94a3b8" },
];
const COLORS = ["#F4B400", "#94a3b8"];

export default function AdminDashboardPage() {
  return (
    <main className="wrapper">
      <div className="box box1">
        <ActiveUsersCard />
      </div>
      <Card className="box box2">
        <h1 className="text-xl font-semibold text-center mt-4">Pending Vehicle</h1>
        <CardContent>
          <div>
            <PieChart width={220} height={200}>
              <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
              <Pie data={data2} cx={120} cy={160} startAngle={180} endAngle={0} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value2">
                {data2.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="flex justify-center gap-8 text-sm">
            {data2.map((item) => (
              <div className="flex flex-col gap-2 items-center" key={item.name}>
                <div className="flex gap-2 items-center">
                  <div className={"w-2.5 h-2.5 rounded-full"} style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span>{item.value2}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="box box3">
        <h1 className="text-xl font-semibold text-center mt-4">Requsted Maintenance</h1>
        <CardContent>
          <div>
            <PieChart width={200} height={200}>
              <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
              <Pie data={data2} cx={110} cy={160} startAngle={180} endAngle={0} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value2">
                {data2.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="flex justify-center gap-8 text-sm">
            {data2.map((item) => (
              <div className="flex flex-col gap-2 items-center" key={item.name}>
                <div className="flex gap-2 items-center">
                  <div className={"w-2.5 h-2.5 rounded-full"} style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span>{item.value2}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="box box4">
        <CardContent className="py-4">
          <div className="h-full flex flex-col justify-between">
            <h1 className="text-2xl font-semibold text-center">Tipe Kendaraan</h1>
            <div className="flex items-center justify-center w-full h-full mt-10">
              <ResponsiveContainer width="99%" height={300}>
                <PieChart>
                  <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
                  <Pie data={data} innerRadius={"70%"} outerRadius={"90%"} paddingAngle={5} dataKey="value">
                    {data.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 text-sm">
              {data.map((item) => (
                <div className="flex flex-col gap-2 items-center" key={item.name}>
                  <div className="flex gap-2 items-center">
                    <div className={"w-2.5 h-2.5 rounded-full"} style={{ backgroundColor: item.color }} />
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

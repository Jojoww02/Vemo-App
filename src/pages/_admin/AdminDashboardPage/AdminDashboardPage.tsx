import "./AdminDashboardPage.scss";
import { ActiveUsersCard } from "./AdminDashboardCards";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import PendingVehicleCard from "./AdminDashboardCards/PendingVehicleCard";
import RequestedMaintenanceVehicleCard from "./AdminDashboardCards/RequestedMaintenanceVehicleCard";
import { Card, CardContent } from "@/components/ui/card";
import TypeVehicleCard from "./AdminDashboardCards/TypeVehicleCard";

const data = [
  {
    name: "Page A",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    pv: 160,
    amt: 2210,
  },
  {
    name: "Page C",
    pv: 180,
    amt: 2290,
  },
  {
    name: "Page D",
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    pv: 160,
    amt: 2100,
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="wrapper">
      <div className="box box1">
        <ActiveUsersCard />
      </div>
      <div className="box box2">
        <PendingVehicleCard />
      </div>
      <div className="box box3">
        <RequestedMaintenanceVehicleCard />
      </div>
      <div className="box box4">
        <TypeVehicleCard />
      </div>
      <Card className="box box5">
        <CardContent>
          <div className="mt-8">
          <h1 className="text-2xl font-semibold text-center">Keterangan</h1>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart
                width={500}
                height={200}
                data={data}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="amt"  stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

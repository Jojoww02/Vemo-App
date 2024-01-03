import { Card, CardContent } from "@/components/ui/card";
import { Cell, Pie, PieChart } from "recharts";
import useCountVehicles from "../useCountVehicles";
import { ICountVehiclesResponse } from "@/api/types";

const COLORS = ["#F4B400", "#94a3b8"];

export default function PendingVehicleCard() {
  const { countVehiclesQuery } = useCountVehicles();
  const { data, isSuccess } = countVehiclesQuery;

  const data2 = [
    { name: "Total Kendaraan", value2: isSuccess ? (data as ICountVehiclesResponse).vehicles : 0, color: "#F4B400" },
    { name: "Kendaraan Pending", value2: isSuccess ? (data as ICountVehiclesResponse).pending : 0, color: "#94a3b8" },
  ];

  return (
    <Card className="h-full">
      <h1 className="text-xl font-semibold text-center mt-8">Pending Vehicle</h1>
      <CardContent>
        <div className="w-full">
          <PieChart width={250} height={200}>
            <Pie data={data2} cx={120} cy={160} startAngle={180} endAngle={0} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value2" label>
              {data2.map((item, index) => (
                <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="flex justify-center gap-8 text-sm">
          {data2.map((item) => (
            <div className="flex flex-col gap-2 items-center" key={item.name}>
              <div className="flex gap-4 items-center">
                <div className={"w-2.5 h-2.5 rounded-full"} style={{ backgroundColor: item.color }} />
                <span className="text-[.65rem]">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

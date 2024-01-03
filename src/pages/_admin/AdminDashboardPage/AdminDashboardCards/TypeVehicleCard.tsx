import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import useCountVehicles from "../useCountVehicles";
import { ICountVehiclesResponse } from "@/api/types";

export default function TypeVehicleCard() {
  const { countVehiclesQuery } = useCountVehicles();
  const {data, isSuccess} = countVehiclesQuery
  
  const data2 = [
    { name: "Matic", value: isSuccess ? (data as ICountVehiclesResponse).matic : 0, color: "#0088FE" },
    { name: "Manual", value: isSuccess ? (data as ICountVehiclesResponse).manual : 0, color: "#00C49F" },
  ];

  return (
    <Card className="h-full">
      <CardContent className="py-4">
        <div className="h-full flex flex-col justify-between">
          <h1 className="text-2xl font-semibold text-center">Tipe Kendaraan</h1>
          <div className="flex items-center justify-center w-full h-full mt-10">
            <ResponsiveContainer width="99%" height={300}>
              <PieChart>
                <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
                <Pie data={data2} innerRadius={"70%"} outerRadius={"90%"} paddingAngle={5} dataKey="value">
                  {data2.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 text-sm">
            {data2.map((item) => (
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
  );
}

import { subDays, format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatDate = (date: Date): string => {
  return format(date, "dd MMM yy");
};

const data = [
  {
    name: "Page A",
    register: 0,
    maintenance: 3,
  },
  {
    name: "Page B",
    register: 0,
    maintenance: 0,
  },
  {
    name: "Page C",
    register: 0,
    maintenance: 1,
  },
  {
    name: "Page D",
    register: 3,
    maintenance: 2,
  },
  {
    name: "Page E",
    register: 5,
    maintenance: 0,
  },
  {
    name: "Page F",
    register: 0,
    maintenance: 4,
  },
  {
    name: "Page G",
    register: 1,
    maintenance: 3,
  },
];

const currentDate = new Date();

data.forEach((item, index) => {
  const modifiedDate = subDays(currentDate, 7 - index - 1);
  item.name = formatDate(modifiedDate);
});

export default function ActifityVehicleCard() {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="mt-8">
          <h1 className="text-2xl font-semibold text-center mb-8">
            Aktifitas Kendaraan
          </h1>
          <ResponsiveContainer width="100%" height={220}>
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
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                labelStyle={{ fontSize: ".8rem" }}
                itemStyle={{ fontSize: ".8rem" }}
              />
              <Area
                type="monotone"
                dataKey="register"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="maintenance"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

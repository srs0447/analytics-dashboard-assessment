import { YearData } from "@/types/ev-data";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function EVPopulationChart({ data }: { data: YearData[] }) {
  console.log("rsc data", data);
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart height={300} width={500} data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

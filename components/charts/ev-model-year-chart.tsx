import { ModelYearData } from "@/types/ev-data"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export default function EVModelYearChart({ data }: { data: ModelYearData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart  height={300} width={500} data={data}>
        <XAxis dataKey="modelYear" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
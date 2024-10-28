import { CountyData } from "@/types/ev-data"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export default function EVCountyDistributionChart({ data }: { data: CountyData[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart  height={300} width={500} data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis type="number" />
        <YAxis dataKey="county" type="category" width={120} />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
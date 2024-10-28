import { TypeData } from "@/types/ev-data"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const COLORS = ['#0088FE', '#00C49F']

export default function EVTypeDistributionChart({ data }: { data: TypeData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart height={300} width={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="count"
          
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartLegend } from "@/components/ui/chart"
import { PokemonTypeDistribution } from "@/types"
import { TYPE_COLORS } from "@/utils/constant"

interface TypeChartProps {
  data: PokemonTypeDistribution[]
  title: string
  description: string
  ref?: React.Ref<HTMLDivElement>
}

export function TypeChart({ data, title, description, ref }: TypeChartProps) {
  const chartData = data.map((item) => ({
    name: item.dominantType,
    value: parseInt(item.count)
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent ref={ref}>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={TYPE_COLORS[entry.name] || "#8884d8"} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#000",
                  borderRadius: "10px"
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#fff" }}
              />

              <ChartLegend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

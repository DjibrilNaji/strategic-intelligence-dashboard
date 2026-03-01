import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RegionScore } from "@/types"
import { REGION_COLORS } from "@/utils/constant"

interface RegionChartProps {
  data: RegionScore[]
  title: string
  description: string
}

export function RegionChart({ data, title, description }: RegionChartProps) {
  const chartData = data.map((item) => ({
    region: item.region,
    score: Number(item.avgScore)
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="region" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000",
                  borderRadius: "10px"
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#fff" }}
                formatter={(value: number) => [parseFloat(value.toString()).toFixed(1), "Score"]}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={REGION_COLORS[index % REGION_COLORS.length]} />
                ))}
              </Bar>{" "}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

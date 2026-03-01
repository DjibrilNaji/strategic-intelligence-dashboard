"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartLegend } from "@/components/ui/chart"
import { PokemonTypeDistribution } from "@/types"
import { TYPE_COLORS } from "@/utils/constant"

interface PokemonTypeChartProps {
  data: PokemonTypeDistribution[]
}

export function PokemonTypeChart({ data }: PokemonTypeChartProps) {
  const chartData = data.map((item) => ({
    name: item.dominantType,
    value: parseInt(item.count)
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pokemon Type Distribution</CardTitle>
        <CardDescription>Dominant types across all countries</CardDescription>
      </CardHeader>

      <CardContent>
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

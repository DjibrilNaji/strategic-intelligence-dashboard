"use client"

import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart"
import { CountryReport } from "@/types"
import { TOP_COUNTRIES_COLORS } from "@/utils/constant"

const chartConfig = {
  desktop: {
    label: "Score"
  }
} satisfies ChartConfig

interface TopCountriesChartProps {
  data: CountryReport[]
}

export function TopCountriesChart({ data }: TopCountriesChartProps) {
  const chartData = data.map((item) => ({
    country: item.country,
    score: parseFloat(item.score)
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Countries by Score</CardTitle>
        <CardDescription>Strategic intelligence ranking</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="country"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis tick={{ fontSize: 11 }} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              labelFormatter={(label) => `🌍 ${label}`}
            />

            <Bar dataKey="score" radius={8}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={TOP_COUNTRIES_COLORS[index % TOP_COUNTRIES_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

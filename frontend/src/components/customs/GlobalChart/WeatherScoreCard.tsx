"use client"

import { CloudSun } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WeatherScoreCardProps {
  score: number
}

export function WeatherScoreCard({ score }: WeatherScoreCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <CloudSun className="size-4" />
          Average Weather Score
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold">{score}</span>
          <span className="text-muted-foreground">/ 20</span>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          Aggregated weather impact score across all monitored countries
        </p>
      </CardContent>
    </Card>
  )
}

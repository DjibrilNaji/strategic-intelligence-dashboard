import { CloudSun } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface WeatherImpactSectionProps {
  globalAverageWeatherScore: number
}

export function WeatherImpactSection({ globalAverageWeatherScore }: WeatherImpactSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudSun className="size-5" />
          Weather Impact Analysis
        </CardTitle>

        <CardDescription>Global weather score influence on strategic power</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold">{Number(globalAverageWeatherScore).toFixed(1)}</span>
          <span className="text-muted-foreground">/ 20</span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          Average weather score across all monitored countries
        </p>
      </CardContent>
    </Card>
  )
}

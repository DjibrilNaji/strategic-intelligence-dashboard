import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PopulationVsPowerProps {
  data: { country: string; score: string; population: number }[]
}

function formatPopulation(pop: number): string {
  if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(1)}B`
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(1)}K`
  return pop.toString()
}

export function PopulationVsPower({ data }: PopulationVsPowerProps) {
  const sorted = [...data].sort((a, b) => parseFloat(b.score) - parseFloat(a.score))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Population vs Power Correlation</CardTitle>
        <CardDescription>Country scores ranked by strategic power</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {sorted.map((item, index) => (
            <div key={item.country} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 text-sm font-mono text-muted-foreground">#{index + 1}</span>
                <span className="text-sm font-medium text-foreground">{item.country}</span>
                <span className="text-xs text-muted-foreground">
                  Pop: {formatPopulation(item.population)}
                </span>
              </div>
              <Badge variant="secondary">{parseFloat(item.score).toFixed(1)}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

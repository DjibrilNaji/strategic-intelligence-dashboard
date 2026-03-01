import { BarChart3, Globe, Trophy } from "lucide-react"

import { StatCard } from "@/components/customs/DeepAnalysis/StatCard"
import { Badge } from "@/components/ui/badge"

interface GlobalOverviewSectionProps {
  totalCountries: number
  globalAverageScore: number
  bestRegion: { region: string; avgScore: number }
}

export function GlobalOverviewSection({
  totalCountries,
  globalAverageScore,
  bestRegion
}: GlobalOverviewSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        icon={Globe}
        label="Total Countries"
        value={totalCountries}
        description="Actively monitored"
      />

      <StatCard
        icon={BarChart3}
        label="Average Score"
        value={globalAverageScore.toFixed(1) ?? "—"}
        description="Across all countries"
      />

      <StatCard
        icon={Trophy}
        label="Best Region"
        value={
          <div className="flex items-center gap-2">
            <span>{bestRegion.region}</span>
            <Badge variant="secondary">Top</Badge>
          </div>
        }
        description={`Avg score: ${bestRegion?.avgScore ? Number(bestRegion.avgScore).toFixed(1) : "—"}`}
      />
    </div>
  )
}

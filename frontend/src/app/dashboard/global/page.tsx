"use client"

import { RegionChart } from "@/components/customs/Charts/RegionChart"
import { TypeChart } from "@/components/customs/Charts/TypeChart"
import { TopCountriesChart } from "@/components/customs/GlobalChart/TopCountriesChart"
import { WeatherScoreCard } from "@/components/customs/GlobalChart/WeatherScoreCard"
import { GlobalChartSkeleton } from "@/components/customs/Skeleton/GlobalChartSkeleton"
import { Error } from "@/components/customs/Utils/Error"
import { useGlobalReport } from "@/hooks/useReports"

export default function GlobalPage() {
  const { data, isLoading, isError } = useGlobalReport()

  if (isLoading) return <GlobalChartSkeleton />

  if (isError) return <Error message="Failed to load global report data." />

  if (!data?.bestCountries?.length) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No data available. Please run the seed script.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Global Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Strategic intelligence metrics across all monitored regions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopCountriesChart data={data!.bestCountries} />

        <TypeChart
          data={data!.pokemonTypeDistribution}
          title="Pokemon Type Distribution"
          description="Dominant types across all countries"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RegionChart
          data={data!.averageScorePerRegion}
          title="Average Score per Region"
          description="Regional performance overview"
        />

        <WeatherScoreCard score={data!.averageWeatherScore} />
      </div>
    </div>
  )
}

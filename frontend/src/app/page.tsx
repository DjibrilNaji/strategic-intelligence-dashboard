"use client"

import { PokemonTypeChart } from "@/components/customs/GlobalChart/PokemonTypeChart"
import { RegionScoreChart } from "@/components/customs/GlobalChart/RegionScoreChart"
import { TopCountriesChart } from "@/components/customs/GlobalChart/TopCountriesChart"
import { WeatherScoreCard } from "@/components/customs/GlobalChart/WeatherScoreCard"
import { GlobalChartSkeleton } from "@/components/customs/Skeleton/GlobalChartSkeleton"
import { Error } from "@/components/customs/Utils/Error"
import { useGlobalReport } from "@/hooks/useReports"

export default function GlobalPage() {
  const { data, isLoading, isError } = useGlobalReport()

  if (isLoading) return <GlobalChartSkeleton />

  if (isError) return <Error message="Failed to load global report data." />

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
        <PokemonTypeChart data={data!.pokemonTypeDistribution} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RegionScoreChart data={data!.averageScorePerRegion} />
        <WeatherScoreCard score={data!.averageWeatherScore} />
      </div>
    </div>
  )
}

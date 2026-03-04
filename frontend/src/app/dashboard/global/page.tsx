"use client"

import { useRef } from "react"

import { RegionChart } from "@/components/customs/Charts/RegionChart"
import { TypeChart } from "@/components/customs/Charts/TypeChart"
import { TopCountriesChart } from "@/components/customs/GlobalChart/TopCountriesChart"
import { WeatherScoreCard } from "@/components/customs/GlobalChart/WeatherScoreCard"
import { PDFReportModal } from "@/components/customs/PDF/pdfReportModal"
import { GlobalChartSkeleton } from "@/components/customs/Skeleton/GlobalChartSkeleton"
import { Error } from "@/components/customs/Utils/Error"
import { useGlobalReport } from "@/hooks/useReports"

export default function GlobalPage() {
  const topCountriesRef = useRef<HTMLDivElement>(null)
  const typeChartRef = useRef<HTMLDivElement>(null)
  const regionChartRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, isError } = useGlobalReport()

  const charts = [
    { id: "top-countries", label: "Top 10 Countries by Score", ref: topCountriesRef },
    { id: "type-chart", label: "Pokemon Type Distribution", ref: typeChartRef },
    { id: "region-chart", label: "Average Score per Region", ref: regionChartRef }
  ]

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Global Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Strategic intelligence metrics across all monitored regions
          </p>
        </div>
        <PDFReportModal charts={charts} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopCountriesChart data={data!.bestCountries} ref={topCountriesRef} />

        <TypeChart
          data={data!.pokemonTypeDistribution}
          title="Pokemon Type Distribution"
          description="Dominant types across all countries"
          ref={typeChartRef}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RegionChart
          data={data!.averageScorePerRegion}
          title="Average Score per Region"
          description="Regional performance overview"
          ref={regionChartRef}
        />

        <WeatherScoreCard score={data!.averageWeatherScore} />
      </div>
    </div>
  )
}

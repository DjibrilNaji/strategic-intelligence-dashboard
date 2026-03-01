"use client"

import { RegionChart } from "@/components/customs/Charts/RegionChart"
import { TypeChart } from "@/components/customs/Charts/TypeChart"
import { CountriesTable } from "@/components/customs/DeepAnalysis/CountriesTable"
import { GlobalOverviewSection } from "@/components/customs/DeepAnalysis/GlobalOverviewSection"
import { PopulationVsPower } from "@/components/customs/DeepAnalysis/PopulationVsPower"
import { WeatherImpactSection } from "@/components/customs/DeepAnalysis/WeatherImpactSection"
import { DeepAnalysisSkeleton } from "@/components/customs/Skeleton/DeepAnalysisSkeleton"
import { Error } from "@/components/customs/Utils/Error"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDeepAnalysis } from "@/hooks/useReports"

export default function DeepAnalysisPage() {
  const { data, isLoading, isError } = useDeepAnalysis()

  if (isLoading) return <DeepAnalysisSkeleton />

  if (isError) return <Error message="Failed to load deep analysis data." />

  if (!data?.globalOverview?.totalCountries) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No data available. Please run the seed script.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Deep Analysis</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Comprehensive intelligence breakdown with detailed metrics
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="flex w-full flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="top">Top Countries</TabsTrigger>
          <TabsTrigger value="worst">Worst Countries</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="types">Types</TabsTrigger>
          <TabsTrigger value="population">Population</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <GlobalOverviewSection
            totalCountries={data!.globalOverview.totalCountries}
            globalAverageScore={data!.globalOverview.globalAverageScore}
            bestRegion={data!.globalOverview.bestRegion}
          />
        </TabsContent>

        <TabsContent value="top" className="mt-6">
          <CountriesTable
            title="Top Performing Countries"
            description="Highest strategic intelligence scores"
            data={data!.bestCountries}
            variant="top"
          />
        </TabsContent>

        <TabsContent value="worst" className="mt-6">
          <CountriesTable
            title="Lowest Performing Countries"
            description="Countries requiring strategic attention"
            data={data!.worstCountries}
            variant="worst"
          />
        </TabsContent>

        <TabsContent value="regions" className="mt-6">
          <RegionChart
            data={data!.averageScorePerRegion}
            title="Regions Comparison"
            description="Average score per region"
          />
        </TabsContent>

        <TabsContent value="weather" className="mt-6">
          <WeatherImpactSection globalAverageWeatherScore={data!.globalAverageWeatherScore} />
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <TypeChart
            data={data!.pokemonTypeDistribution}
            title="Type Dominance Analysis"
            description="Distribution of dominant pokemon types"
          />
        </TabsContent>

        <TabsContent value="population" className="mt-6">
          <PopulationVsPower data={data!.populationVsPowerCorrelation} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

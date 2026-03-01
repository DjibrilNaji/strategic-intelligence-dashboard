import type { Context } from "hono"

import { db } from "@/db"
import {
  getAllReports,
  getAvgScoreByRegion,
  getTopCountries,
  getTypeDistributionPerCountry,
  getWeakestCountries
} from "@/repositories/report.repository"

export async function getGlobalReport(c: Context) {
  const bestCountries = await getTopCountries(db)
  const averageScorePerRegion = await getAvgScoreByRegion(db)
  const pokemonTypeDistribution = await getTypeDistributionPerCountry(db)

  const averageWeatherScore =
    bestCountries.reduce((sum, r) => sum + Number(r.weatherScore), 0) / bestCountries.length

  return c.json({
    bestCountries,
    averageScorePerRegion,
    pokemonTypeDistribution,
    averageWeatherScore: Math.round(averageWeatherScore * 10) / 10
  })
}

export async function getDeepAnalysis(c: Context) {
  const bestCountries = await getTopCountries(db, 5)
  const worstCountries = await getWeakestCountries(db, 5)
  const averageScorePerRegion = await getAvgScoreByRegion(db)
  const pokemonTypeDistribution = await getTypeDistributionPerCountry(db)
  const allCountryReports = await getAllReports(db)

  const globalAverageScore =
    allCountryReports.reduce((sum, r) => sum + Number(r.score), 0) / allCountryReports.length

  const globalAverageWeatherScore =
    allCountryReports.reduce((sum, r) => sum + Number(r.weatherScore), 0) / allCountryReports.length

  const averageScorePerRegionFormatted = averageScorePerRegion.map((r) => ({
    region: r.region,
    avgScore: Math.round(Number(r.avgScore) * 10) / 10
  }))

  const bestRegion = averageScorePerRegionFormatted[0]

  return c.json({
    globalOverview: {
      totalCountries: allCountryReports.length,
      globalAverageScore: Math.round(globalAverageScore * 10) / 10,
      bestRegion
    },
    bestCountries,
    worstCountries,
    averageScorePerRegion: averageScorePerRegionFormatted,
    globalAverageWeatherScore: Math.round(globalAverageWeatherScore * 10) / 10,
    pokemonTypeDistribution,
    populationVsPowerCorrelation: allCountryReports.map((report) => ({
      country: report.country,
      score: report.score
    }))
  })
}

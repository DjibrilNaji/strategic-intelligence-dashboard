export type CountryReport = {
  id: number
  country: string
  region: string
  score: string
  weatherScore: string
  dominantType: string
  pokemonNames: string[]
  calculatedAt: string
}

export type RegionScore = {
  region: string
  avgScore: number
}

export type PokemonTypeDistribution = {
  dominantType: string
  count: string
}

export type GlobalReportData = {
  bestCountries: CountryReport[]
  averageScorePerRegion: RegionScore[]
  pokemonTypeDistribution: PokemonTypeDistribution[]
  averageWeatherScore: number
}

export type DeepAnalysisData = {
  globalOverview: { totalCountries: number; globalAverageScore: number; bestRegion: RegionScore }
  bestCountries: CountryReport[]
  worstCountries: CountryReport[]
  averageScorePerRegion: RegionScore[]
  globalAverageWeatherScore: number
  pokemonTypeDistribution: PokemonTypeDistribution[]
  populationVsPowerCorrelation: { country: string; score: string; population: number }[]
}

export type ChartItem = {
  id: string
  label: string
  ref: React.RefObject<HTMLDivElement | null>
}

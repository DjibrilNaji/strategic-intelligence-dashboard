export interface CountryReport {
  id: number
  country: string
  region: string
  score: string
  weatherScore: string
  dominantType: string
  pokemonNames: string[]
  calculatedAt: string
}

export interface RegionScore {
  region: string
  avgScore: number
}

export interface PokemonTypeDistribution {
  dominantType: string
  count: string
}

export interface GlobalReportData {
  bestCountries: CountryReport[]
  averageScorePerRegion: RegionScore[]
  pokemonTypeDistribution: PokemonTypeDistribution[]
  averageWeatherScore: number
}

export interface DeepAnalysisData {
  globalOverview: { totalCountries: number; globalAverageScore: number; bestRegion: RegionScore }
  bestCountries: CountryReport[]
  worstCountries: CountryReport[]
  averageScorePerRegion: RegionScore[]
  globalAverageWeatherScore: number
  pokemonTypeDistribution: PokemonTypeDistribution[]
  populationVsPowerCorrelation: { country: string; score: string }[]
}

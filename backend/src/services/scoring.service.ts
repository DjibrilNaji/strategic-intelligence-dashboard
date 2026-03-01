import { Pokemon, Weather } from "@/types/api"

type FinalScore = {
  score: number
  weatherScore: number
  dominantType: string
}

export function getDominantType(pokemons: Pokemon[]): string {
  const typeCounts: Record<string, number> = {}

  for (const pokemon of pokemons) {
    for (const t of pokemon.types) {
      const type = t.type.name
      typeCounts[type] = (typeCounts[type] ?? 0) + 1
    }
  }

  let dominantType = ""
  let maxCount = 0

  for (const [type, count] of Object.entries(typeCounts)) {
    if (count > maxCount) {
      maxCount = count
      dominantType = type
    }
  }

  return dominantType
}

export function calcPokemonScore(pokemons: Pokemon[]): number {
  let totalStats = 0

  for (const pokemon of pokemons) {
    for (const stat of pokemon.stats) {
      totalStats += stat.base_stat
    }
  }

  const avgStats = totalStats / pokemons.length
  let score = (avgStats / 600) * 100

  const dominantType = getDominantType(pokemons)

  if (dominantType === "dragon" || dominantType === "psychic") score += 15
  else if (dominantType === "fire" || dominantType === "dark") score += 10
  else if (dominantType === "water" || dominantType === "electric") score += 7

  return score
}

export function calcWeatherScore(weather: Weather): number {
  let score = 0

  const temperature = weather.current.temperature_2m
  const wind = weather.current.wind_speed_10m
  const precipitation = weather.current.precipitation

  if (temperature >= 15 && temperature <= 25) score += 10
  else if (temperature >= 5 && temperature < 15) score += 5
  else if (temperature < 0) score -= 5

  if (wind < 20) score += 5
  else if (wind > 60) score -= 5

  if (precipitation === 0) score += 5
  else if (precipitation > 10) score -= 5

  return score
}

export function calcPopulationScore(population: number): number {
  if (population > 100000000) return 20
  if (population > 10000000) return 10
  if (population > 1000000) return 5
  return -5
}

export function calcFinalScore(
  pokemons: Pokemon[],
  weather: Weather,
  population: number
): FinalScore {
  const pokemonScore = calcPokemonScore(pokemons)
  const weatherScore = calcWeatherScore(weather)
  const populationScore = calcPopulationScore(population)

  const total = pokemonScore + weatherScore + populationScore

  return {
    score: Math.max(0, Math.round(total * 10) / 10),
    weatherScore: Math.round(weatherScore * 10) / 10,
    dominantType: getDominantType(pokemons)
  }
}

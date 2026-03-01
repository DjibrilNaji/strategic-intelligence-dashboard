import "dotenv/config"

import { db } from "@/db"
import { fetchCountries } from "@/external/openmeteo.client"
import { fetchRandomPokemon } from "@/external/pokeapi.client"
import { fetchWeather } from "@/external/restcountries.client"
import { insertClimate } from "@/repositories/climate.repository"
import { insertGeoZone } from "@/repositories/geozone.repository"
import { insertPokemon } from "@/repositories/pokemon.repository"
import { insertReport } from "@/repositories/report.repository"
import { calcFinalScore } from "@/services/scoring.service"

const POKEMON_PER_COUNTRY = 5
const COUNTRIES_LIMIT = 20

async function seed() {
  console.log("🌱 Starting seed...")

  console.log("🌍 Fetching countries...")
  const allCountries = await fetchCountries()
  const countries = allCountries.slice(0, COUNTRIES_LIMIT)

  for (const country of countries) {
    const countryName = country.name.common
    const [lat, lng] = country.latlng

    console.log(`\n📍 Processing ${countryName}...`)

    try {
      await insertGeoZone(db, {
        country: countryName,
        population: country.population,
        region: country.region,
        lat,
        lng
      })

      const pokemons = await fetchRandomPokemon(POKEMON_PER_COUNTRY)

      for (const pokemon of pokemons) {
        const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)

        const types = pokemon.types.map((t) => t.type.name)

        await insertPokemon(db, {
          name: pokemon.name,
          baseStats: totalStats,
          types,
          weight: pokemon.weight,
          height: pokemon.height
        })
      }

      const weather = await fetchWeather(lat, lng)

      await insertClimate(db, {
        country: countryName,
        temperature: weather.current.temperature_2m,
        windSpeed: weather.current.wind_speed_10m,
        precipitation: weather.current.precipitation
      })

      const { score, weatherScore, dominantType } = calcFinalScore(
        pokemons,
        weather,
        country.population
      )

      await insertReport(db, {
        country: countryName,
        region: country.region,
        score,
        weatherScore,
        dominantType,
        pokemonNames: pokemons.map((p) => p.name)
      })

      console.log(`✅ ${countryName} — score: ${score} — type: ${dominantType}`)
    } catch (err) {
      console.error(`❌ Error processing ${countryName}:`, err)
    }
  }

  console.log("\n🎉 Seed complete!")
  await db.destroy()
}

seed()

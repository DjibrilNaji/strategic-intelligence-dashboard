import { Weather, WeatherSchema } from "@/types/api"

export async function fetchWeather(lat: number, lng: number): Promise<Weather> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,precipitation`

  const res = await fetch(url)
  const data = await res.json()

  return WeatherSchema.parse(data)
}

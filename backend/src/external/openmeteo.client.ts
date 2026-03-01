import z from "zod"

import { Country, CountrySchema } from "@/types/api"

export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,population,region,latlng")

  const data = await res.json()

  return z.array(CountrySchema).parse(data)
}

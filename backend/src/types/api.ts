import { z } from "zod";

export const PokemonSchema = z.object({
  name: z.string(),
  weight: z.number(),
  height: z.number(),
  types: z.array(z.object({ type: z.object({ name: z.string() }) })),
  stats: z.array(z.object({ base_stat: z.number() })),
});

export const CountrySchema = z.object({
  name: z.object({ common: z.string() }),
  population: z.number(),
  region: z.string(),
  latlng: z.array(z.number()).length(2),
});

export const WeatherSchema = z.object({
  current: z.object({
    temperature_2m: z.number(),
    wind_speed_10m: z.number(),
    precipitation: z.number(),
  }),
});

export type Pokemon = z.infer<typeof PokemonSchema>;
export type Country = z.infer<typeof CountrySchema>;
export type Weather = z.infer<typeof WeatherSchema>;

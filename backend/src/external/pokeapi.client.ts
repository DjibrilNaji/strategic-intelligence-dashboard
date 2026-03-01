import { Pokemon, PokemonSchema } from "@/types/api";

// Total number of pokemon in PokéAPI as of Mars 2026.
const TOTAL_POKEMON = 1350;

export async function fetchRandomPokemon(count: number): Promise<Pokemon[]> {
  const ids: number[] = [];

  for (let i = 0; i < count; i++) {
    ids.push(Math.floor(Math.random() * TOTAL_POKEMON) + 1);
  }

  const results = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      return PokemonSchema.parse(data);
    }),
  );

  return results;
}

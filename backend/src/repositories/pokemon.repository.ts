import { Kysely } from "kysely"

import { Database } from "@/db"
import { NewPokemonAsset } from "@/types/db"

export async function insertPokemon(db: Kysely<Database>, data: NewPokemonAsset) {
  return db
    .insertInto("pokemonAssets")
    .values(data)
    .onConflict((oc) => oc.column("name").doNothing())
    .returningAll()
    .executeTakeFirst()
}

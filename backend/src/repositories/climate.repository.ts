import { Kysely } from "kysely"

import { Database } from "@/db"
import { NewClimateCondition } from "@/types/db"

export async function insertClimate(db: Kysely<Database>, data: NewClimateCondition) {
  return db.insertInto("climateConditions").values(data).returningAll().executeTakeFirst()
}

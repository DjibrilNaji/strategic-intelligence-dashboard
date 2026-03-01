import { Kysely } from "kysely"

import { Database } from "@/db"
import { NewGeoZone } from "@/types/db"

export async function insertGeoZone(db: Kysely<Database>, data: NewGeoZone) {
  return db
    .insertInto("geoZones")
    .values(data)
    .onConflict((oc) => oc.column("country").doNothing())
    .returningAll()
    .executeTakeFirst()
}

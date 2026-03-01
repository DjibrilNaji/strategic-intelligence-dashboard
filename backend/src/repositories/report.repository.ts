import { Kysely } from "kysely";

import { Database } from "@/db";
import { NewCountryReport } from "@/types/db";

export async function insertReport(
  db: Kysely<Database>,
  data: NewCountryReport,
) {
  return db
    .insertInto("countryReports")
    .values(data)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function getTopCountries(db: Kysely<Database>, limit = 10) {
  return db
    .selectFrom("countryReports")
    .orderBy("score", "desc")
    .limit(limit)
    .selectAll()
    .execute();
}

export async function getAvgScoreByRegion(db: Kysely<Database>) {
  return db
    .selectFrom("countryReports")
    .select(["region"])
    .select((eb) => eb.fn.avg("score").as("avgScore"))
    .groupBy("region")
    .orderBy("avgScore", "desc")
    .execute();
}

export async function getTypeDistribution(db: Kysely<Database>) {
  return db
    .selectFrom("countryReports")
    .select(["dominantType"])
    .select((eb) => eb.fn.count("id").as("count"))
    .groupBy("dominantType")
    .execute();
}

export async function getWeakestCountries(db: Kysely<Database>, limit = 10) {
  return db
    .selectFrom("countryReports")
    .orderBy("score", "asc")
    .limit(limit)
    .selectAll()
    .execute();
}

export async function getAllReports(db: Kysely<Database>) {
  return db.selectFrom("countryReports").selectAll().execute();
}

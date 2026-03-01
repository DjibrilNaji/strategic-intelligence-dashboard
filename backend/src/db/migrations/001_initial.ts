import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("pokemon_assets")
    .ifNotExists()
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull().unique())
    .addColumn("base_stats", "integer", (col) => col.notNull())
    .addColumn("types", sql`text[]`, (col) => col.notNull())
    .addColumn("weight", "integer", (col) => col.notNull())
    .addColumn("height", "integer", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("geo_zones")
    .ifNotExists()
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("country", "text", (col) => col.notNull().unique())
    .addColumn("population", "bigint", (col) => col.notNull())
    .addColumn("region", "text", (col) => col.notNull())
    .addColumn("lat", sql`numeric(9,6)`, (col) => col.notNull())
    .addColumn("lng", sql`numeric(9,6)`, (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("climate_conditions")
    .ifNotExists()
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("country", "text", (col) => col.notNull())
    .addColumn("temperature", sql`numeric(5,2)`, (col) => col.notNull())
    .addColumn("wind_speed", sql`numeric(5,2)`, (col) => col.notNull())
    .addColumn("precipitation", sql`numeric(5,2)`, (col) => col.notNull())
    .addColumn("recorded_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createTable("country_reports")
    .ifNotExists()
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("country", "text", (col) => col.notNull())
    .addColumn("region", "text", (col) => col.notNull())
    .addColumn("score", sql`numeric(6,2)`, (col) => col.notNull())
    .addColumn("weather_score", sql`numeric(6,2)`, (col) => col.notNull())
    .addColumn("dominant_type", "text", (col) => col.notNull())
    .addColumn("pokemon_names", sql`text[]`, (col) => col.notNull())
    .addColumn("calculated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("country_reports").ifExists().execute();
  await db.schema.dropTable("climate_conditions").ifExists().execute();
  await db.schema.dropTable("geo_zones").ifExists().execute();
  await db.schema.dropTable("pokemon_assets").ifExists().execute();
}

import "dotenv/config";

import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import {
  ClimateConditionTable,
  CountryReportTable,
  GeoZoneTable,
  PokemonAssetTable,
} from "@/types/db";

export interface Database {
  pokemonAssets: PokemonAssetTable;
  geoZones: GeoZoneTable;
  climateConditions: ClimateConditionTable;
  countryReports: CountryReportTable;
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
  plugins: [new CamelCasePlugin()],
});

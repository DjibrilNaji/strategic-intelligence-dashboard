import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface PokemonAssetTable {
  id: Generated<number>;
  name: string;
  baseStats: number;
  types: string[];
  weight: number;
  height: number;
}

export interface GeoZoneTable {
  id: Generated<number>;
  country: string;
  population: number;
  region: string;
  lat: number;
  lng: number;
}

export interface ClimateConditionTable {
  id: Generated<number>;
  country: string;
  temperature: number;
  windSpeed: number;
  precipitation: number;
  recordedAt: ColumnType<Date, string | undefined, never>;
}

export interface CountryReportTable {
  id: Generated<number>;
  country: string;
  region: string;
  score: number;
  weatherScore: number;
  dominantType: string;
  pokemonNames: string[];
  calculatedAt: ColumnType<Date, string | undefined, never>;
}

export type PokemonAsset = Selectable<PokemonAssetTable>;
export type NewPokemonAsset = Insertable<PokemonAssetTable>;
export type PokemonAssetUpdate = Updateable<PokemonAssetTable>;

export type GeoZone = Selectable<GeoZoneTable>;
export type NewGeoZone = Insertable<GeoZoneTable>;
export type GeoZoneUpdate = Updateable<GeoZoneTable>;

export type ClimateCondition = Selectable<ClimateConditionTable>;
export type NewClimateCondition = Insertable<ClimateConditionTable>;
export type ClimateConditionUpdate = Updateable<ClimateConditionTable>;

export type CountryReport = Selectable<CountryReportTable>;
export type NewCountryReport = Insertable<CountryReportTable>;
export type CountryReportUpdate = Updateable<CountryReportTable>;

import { db } from "@/database/client.js";
import { eq } from "drizzle-orm";
import { countries } from "@/database/schema/countries.js";
import type { Country } from "@/database/schema/countries.js";

async function findOne(id: number): Promise<Country | null> {
  const [country] = await db.select().from(countries).where(eq(countries.id, id));

  return country || null;
}

async function findAll(): Promise<Country[]> {
  const allCountries = await db.select().from(countries);

  return allCountries;
}

export const CountryService = {
  findOne,
  findAll,
};

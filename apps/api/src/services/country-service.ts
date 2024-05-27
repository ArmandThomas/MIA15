import { db } from "@/database/client.js";
import { eq } from "drizzle-orm";
import { countries } from "@/database/schema/countries.js";
import type { NewCountry, Country } from "@/database/schema/countries.js";

async function findOne(id: number): Promise<Country | null> {
  const [country] = await db.select().from(countries).where(eq(countries.id, id));

  return country || null;
}

async function findAll(): Promise<Country[]> {
  const allCountries = await db.select().from(countries);

  return allCountries;
}

async function create(country: NewCountry): Promise<Country> {
  const [insertedCountry] = await db.insert(countries).values(country);

  const [createdCountry] = await db
    .select()
    .from(countries)
    .where(eq(countries.id, insertedCountry.insertId));

  if (!createdCountry) {
    throw new Error("Country not found");
  }

  return createdCountry;
}

export const CountryService = {
  findOne,
  findAll,
  create,
};

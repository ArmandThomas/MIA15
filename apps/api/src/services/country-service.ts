import { db } from "@/database/client.js";
import type { Country } from "@/database/schema/countries.js";

async function findOne(id: number): Promise<Country | null> {
  const country = await db.query.countries.findFirst({ 
    where: (countries, { eq }) => eq(countries.id, id) 
  });

  return country || null;
}

async function findAll(): Promise<Country[]> {
  const allCountries = await db.query.countries.findMany();
  return allCountries;
}

export const CountryService = {
  findOne,
  findAll,
};

import { db } from "@/database/client.js";
import type { Athlete } from "@/database/schema/athletes.js";

async function findOne(id: number): Promise<Athlete | null> {
  const athlete = await db.query.athletes.findFirst({
    where: (athletes, { eq }) => eq(athletes.id, id),
  });

  return athlete || null;
}

async function findAll(): Promise<Athlete[]> {
  const allAthletes = await db.query.athletes.findMany();
  return allAthletes;
}

async function findByCountry(country: string): Promise<Athlete[]> {
  const athletesByCountry = await db.query.athletes.findMany({
    where: (athletes, { eq }) => eq(athletes.idCountry, parseInt(country)),
  });

  return athletesByCountry;
}

export const AthleteService = {
  findOne,
  findAll,
  findByCountry,
};

import type { Athlete } from "@/database/schema/athletes.js";
import type { PaginationFilters } from "@shared/dto/PaginationFilters.js";
import { db } from "@/database/client.js";
import { getOffset } from "@/utils/filters.js";

async function findOne(id: number): Promise<Athlete | null> {
  const athlete = await db.query.athletes.findFirst({
    where: (athletes, { eq }) => eq(athletes.id, id),
  });

  return athlete || null;
}

async function findAll(filters: PaginationFilters): Promise<Athlete[]> {
  const { page, count } = filters;
  const allAthletes = await db.query.athletes.findMany({
    offset: getOffset(page, count),
    limit: count,
  });
  return allAthletes;
}

export const AthleteService = {
  findOne,
  findAll,
};

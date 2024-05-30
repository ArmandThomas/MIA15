import type { AthleteMedalsAggregate } from "@shared/dto/AthleteMedalsAggregate.js";
import type { AthleteMedalsAggregateFilters } from "@shared/dto/AthleteMedalsAggregateFilters.js";
import type { PaginationResponse } from "@shared/dto/PaginationResponse.js";
import { db } from "@/database/client.js";
import { count, eq, sql } from "drizzle-orm";
import { athletes } from "@/database/schema/athletes.js";
import { countries } from "@/database/schema/countries.js";
import { results } from "@/database/schema/results.js";
import { filterByCountryCodeIso, withPagination } from "@/utils/filters.js";

interface AthleteMedalsAggregateWithTotal extends AthleteMedalsAggregate {
  total: number;
}

function toPaginationResponse(
  rows: AthleteMedalsAggregateWithTotal[],
  filters: AthleteMedalsAggregateFilters,
): PaginationResponse<AthleteMedalsAggregate> {
  const { page, count } = filters;

  const total = rows.at(0)?.total ?? 0;
  const totalPages = Math.ceil(total / count);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;
  const prevPage = hasPrevPage ? page - 1 : null;
  const nextPage = hasNextPage ? page + 1 : null;

  return {
    data: rows.map(({ total, ...rest }) => ({
      ...rest,
    })),
    totalCount: total,
    totalPages,
    page,
    pageSize: count,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  };
}

async function findAllByAthlete(
  filters: AthleteMedalsAggregateFilters,
): Promise<PaginationResponse<AthleteMedalsAggregate>> {
  let athleteMedalsQuery = db
    .select({
      name: athletes.fullName,
      country: countries.name,
      goldMedalCount: sql`SUM(CASE WHEN ${results.position} = 1 THEN 1 ELSE 0 END)`
        .mapWith(Number)
        .as("goldMedalCount"),
      silverMedalCount: sql`SUM(CASE WHEN ${results.position} = 2 THEN 1 ELSE 0 END)`
        .mapWith(Number)
        .as("silverMedalCount"),
      bronzeMedalCount: sql`SUM(CASE WHEN ${results.position} = 3 THEN 1 ELSE 0 END)`
        .mapWith(Number)
        .as("bronzeMedalCount"),
    })
    .from(results)
    .innerJoin(athletes, eq(athletes.id, results.idAthlete))
    .innerJoin(countries, eq(countries.id, results.idCountry))
    .where(sql`${results.position} IS NOT NULL`)
    .groupBy(athletes.fullName, countries.name)
    .$dynamic();

  let totalCountQuery = db
    .select({
      total: count(sql`DISTINCT ${athletes.fullName}, ${countries.name}`).as("total"),
    })
    .from(results)
    .innerJoin(athletes, eq(athletes.id, results.idAthlete))
    .innerJoin(countries, eq(countries.id, results.idCountry))
    .where(sql`${results.position} IS NOT NULL`)
    .$dynamic();

  if (filters.country) {
    athleteMedalsQuery = filterByCountryCodeIso(athleteMedalsQuery, filters.country);
    totalCountQuery = filterByCountryCodeIso(totalCountQuery, filters.country);
  }

  athleteMedalsQuery = withPagination(athleteMedalsQuery, filters.page, filters.count);

  const sqMedals = db.$with("sqMedals").as(athleteMedalsQuery);
  const sbTotal = db.$with("sbTotal").as(totalCountQuery);

  const atheleteResultList: AthleteMedalsAggregateWithTotal[] = await db
    .with(sqMedals, sbTotal)
    .select({
      total: sbTotal.total,
      name: sqMedals.name,
      country: sqMedals.country,
      goldMedalCount: sqMedals.goldMedalCount,
      silverMedalCount: sqMedals.silverMedalCount,
      bronzeMedalCount: sqMedals.bronzeMedalCount,
    })
    .from(sqMedals)
    .innerJoin(sbTotal, sql`true`)
    .orderBy(sql`total DESC`);

  return toPaginationResponse(atheleteResultList, filters);
}

export const MedalService = {
  findAllByAthlete,
};

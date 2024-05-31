import type { MySqlSelect } from "drizzle-orm/mysql-core";
import { countries } from "@/database/schema/countries.js";
import { sql } from "drizzle-orm";
import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  count: z.coerce.number().int().positive().optional(),
});

export function getOffset(page: number, pageSize: number) {
  return (page - 1) * pageSize;
}

export function withPagination<T extends MySqlSelect>(qb: T, page = 1, pageSize = 10) {
  const offset = getOffset(page, pageSize);
  return qb.limit(pageSize).offset(offset);
}

export function filterByCountryCodeIso<T extends MySqlSelect>(qb: T, codeIso: string) {
  return qb.where(sql`${countries.code_iso} = ${codeIso}`);
}

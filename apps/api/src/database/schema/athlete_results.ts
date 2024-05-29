import { mysqlTable, bigint, primaryKey } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

import { athletes } from "./athletes.js";
import { results } from "./results.js";

export const athlete_results = mysqlTable(
  "athlete_results",
  {
    idAthlete: bigint("id_athlete", { mode: "number", unsigned: true })
      .notNull()
      .references(() => athletes.id),

    idResult: bigint("id_result", { mode: "number", unsigned: true })
      .notNull()
      .references(() => results.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.idAthlete, table.idResult] }),
    };
  },
);

export const athlete_resultsRelations = relations(athlete_results, ({ one }) => ({
  athlete: one(athletes),
  result: one(results),
}));

export type athlete_result = typeof athlete_results.$inferSelect;
export type NewAthlete_result = typeof athlete_results.$inferInsert;

// Schema for inserting a user - can be used to validate API requests
export const insertathlete_resultschema = createInsertSchema(athlete_results);
// Schema for selecting a user - can be used to validate API responses
export const selectathlete_resultschema = createSelectSchema(athlete_results);

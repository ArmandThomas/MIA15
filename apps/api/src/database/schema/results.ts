import { mysqlTable, mysqlEnum, varchar, serial, smallint, bigint } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { athlete_results } from "./athlete_results.js";
import { team_results } from "./team_results.js";
import { events } from "./events.js";

export const results = mysqlTable("results", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 256 }).notNull(),
  value_type: mysqlEnum("value_type", ["Type1", "Type2"]).notNull(),
  rank: smallint("rank").notNull(),
  idEvent: bigint("id_Event", { mode: "number", unsigned: true })
    .notNull()
    .references(() => events.id),
});

export const resultsRelations = relations(results, ({ many, one }) => ({
  athlete_result: many(athlete_results),
  team_result: many(team_results),
  event: one(events),
}));

export type Result = typeof results.$inferSelect;
export type NewResult = typeof results.$inferInsert;

// Schema for inserting a user - can be used to validate API requests
export const insertResultSchema = createInsertSchema(results);
// Schema for selecting a user - can be used to validate API responses
export const selectResultSchema = createSelectSchema(results);

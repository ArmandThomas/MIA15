import {
  mysqlTable,
  varchar,
  serial,
  smallint,
  bigint,
  boolean,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { events } from "./events.js";
import { countries } from "./countries.js";
import { athletes } from "./athletes.js";

export const results = mysqlTable("results", {
  id: serial("id").primaryKey(),
  participantType: mysqlEnum("participant_type", ["Athlete", "GameTeam"]).notNull(),
  value: varchar("value", { length: 256 }),
  valueType: varchar("value_type", { length: 20 }),
  isEquality: boolean("is_equality").notNull(),
  position: smallint("position"),
  idEvent: bigint("id_event", { mode: "number", unsigned: true })
    .notNull()
    .references(() => events.id),
  idCountry: bigint("id_country", { mode: "number", unsigned: true }).references(
    () => countries.id,
  ),
  idAthlete: bigint("id_athlete", { mode: "number", unsigned: true }).references(() => athletes.id),
});

export const resultsRelations = relations(results, ({ one }) => ({
  athlete: one(athletes),
  country: one(countries),
  event: one(events),
}));

export type Result = typeof results.$inferSelect;
export type NewResult = typeof results.$inferInsert;

export const insertResultSchema = createInsertSchema(results);
export const selectResultSchema = createSelectSchema(results);

import { mysqlTable, varchar, serial, smallint, text, bigint } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { hosts } from "./hosts.js";

export const athletes = mysqlTable("athletes", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 256 }),
  fullName: varchar("full_name", { length: 256 }).notNull(),
  firstEdition: bigint("first_edition", { mode: "number", unsigned: true }).references(
    () => hosts.id,
  ),
  birthYear: smallint("birth_year"),
  bio: text("bio"),
});

export const athletesRelations = relations(athletes, ({ one }) => ({
  firstEdition: one(hosts),
}));

export type Athlete = typeof athletes.$inferSelect;
export type NewAthlete = typeof athletes.$inferInsert;

export const insertAthleteSchema = createInsertSchema(athletes);
export const selectAthleteSchema = createSelectSchema(athletes);

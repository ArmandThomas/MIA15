import { mysqlTable, varchar, serial, smallint, text } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { countries } from "./countries.js";

export const athletes = mysqlTable("athletes", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 256 }).notNull(),
  firstEdition: serial("first_edition").notNull(),
  birthYear: smallint("birth_year").notNull(),
  bio: text("bio"),
  idCountry: serial("id_country").notNull().references(() => countries.id),
});

export const athletesRelations = relations(athletes, ({ one }) => ({
  country: one(countries),
}));

export type Athlete = typeof athletes.$inferSelect;
export type NewAthlete = typeof athletes.$inferInsert;

// Schema for inserting a user - can be used to validate API requests
export const insertAthleteSchema = createInsertSchema(athletes);
// Schema for selecting a user - can be used to validate API responses
export const selectAthleteSchema = createSelectSchema(athletes);

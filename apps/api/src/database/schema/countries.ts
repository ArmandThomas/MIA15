import { mysqlTable, varchar, char, serial } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { athletes } from "./athletes.js";
import { hosts } from "./hosts.js";

export const countries = mysqlTable("countries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  code: varchar("code", { length: 4 }).unique(),
  code_iso: char("code_iso", { length: 3 }).unique().notNull(),
});

export const countriesRelations = relations(countries, ({ many }) => ({
  athletes: many(athletes),
  hosts: many(hosts),
}));

export type Country = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;

// Schema for inserting a user - can be used to validate API requests
export const insertCountrySchema = createInsertSchema(countries);
// Schema for selecting a user - can be used to validate API responses
export const selectCountrySchema = createSelectSchema(countries);

import { mysqlTable, varchar, serial } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const countries = mysqlTable("countries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
});

export type Country = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;

// Schema for inserting a user - can be used to validate API requests
export const insertCountrySchema = createInsertSchema(countries);
// Schema for selecting a user - can be used to validate API responses
export const selectCountrySchema = createSelectSchema(countries);

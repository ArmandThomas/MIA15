import { mysqlTable, varchar, serial } from "drizzle-orm/mysql-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { host_disciplines } from "./host_disciplines.js";

export const disciplines = mysqlTable("disciplines", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
});

export const disciplinesRelations = relations(disciplines, ({ many }) => ({
  host_disciplines: many(host_disciplines),
}));

export type Country = typeof disciplines.$inferSelect;
export type NewCountry = typeof disciplines.$inferInsert;

// Schema for inserting a user - can be used to validate API requests
export const insertDisciplineSchema = createInsertSchema(disciplines);
// Schema for selecting a user - can be used to validate API responses
export const selectDisciplineSchema = createSelectSchema(disciplines);

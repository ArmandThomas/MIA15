import { mysqlTable, varchar, serial } from "drizzle-orm/mysql-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { hostDisciplines } from "./host_disciplines.js";

export const disciplines = mysqlTable("disciplines", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
});

export const disciplinesRelations = relations(disciplines, ({ many }) => ({
  host_disciplines: many(hostDisciplines),
}));

export type Discipline = typeof disciplines.$inferSelect;
export type NewDiscipline = typeof disciplines.$inferInsert;

export const insertDisciplineSchema = createInsertSchema(disciplines);
export const selectDisciplineSchema = createSelectSchema(disciplines);

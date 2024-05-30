import { mysqlTable, varchar, serial, bigint, mysqlEnum, foreignKey } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { results } from "./results.js";
import { host_disciplines } from "./host_disciplines.js";

export const events = mysqlTable(
  "events",
  {
    id: serial("id").primaryKey(),
    idDiscipline: bigint("id_discipline", { mode: "number", unsigned: true }).notNull(),
    idHost: bigint("id_Host", { mode: "number", unsigned: true }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    gender: mysqlEnum("gender", ["Men", "Women", "Mixed"]).notNull(),
  },
  (table) => ({
    cfk: foreignKey({
      name: "events_host_disciplines_fk",
      columns: [table.idDiscipline, table.idHost],
      foreignColumns: [host_disciplines.idDiscipline, host_disciplines.idHost],
    }),
  }),
);

export const eventsRelations = relations(events, ({ one, many }) => ({
  result: many(results),
  host_disciplines: one(host_disciplines, {
    fields: [events.idDiscipline, events.idHost],
    references: [host_disciplines.idDiscipline, host_disciplines.idHost],
  }),
}));

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

// Schema for inserting a user - can be used to validate API requests
export const insertEventSchema = createInsertSchema(events);
// Schema for selecting a user - can be used to validate API responses
export const selectEventSchema = createSelectSchema(events);

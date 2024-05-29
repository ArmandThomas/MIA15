import { mysqlTable, bigint, primaryKey } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { disciplines } from "./disciplines.js";
import { hosts } from "./hosts.js";
import { events } from "./events.js";

export const host_disciplines = mysqlTable(
  "host_disciplines",
  {
    idDiscipline: bigint("id_discipline", { mode: "number", unsigned: true })
      .notNull()
      .references(() => disciplines.id),

    idHost: bigint("id_host", { mode: "number", unsigned: true })
      .notNull()
      .references(() => hosts.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.idDiscipline, table.idHost] }),
    };
  },
);

export const host_disciplinesRelations = relations(host_disciplines, ({ one, many }) => ({
  discipline: one(disciplines),
  host: one(hosts),
  event: many(events),
}));

export type host_discipline = typeof host_disciplines.$inferSelect;
export type NewHost_discipline = typeof host_disciplines.$inferInsert;

// Schema for inserting a user - can be used to validate API requests
export const inserthost_disciplinesschema = createInsertSchema(host_disciplines);
// Schema for selecting a user - can be used to validate API responses
export const selecthost_disciplinesschema = createSelectSchema(host_disciplines);

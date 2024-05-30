import { mysqlTable, bigint, primaryKey } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { disciplines } from "./disciplines.js";
import { hosts } from "./hosts.js";
import { events } from "./events.js";

export const hostDisciplines = mysqlTable(
  "host_disciplines",
  {
    idDiscipline: bigint("id_discipline", { mode: "number", unsigned: true })
      .notNull()
      .references(() => disciplines.id),

    idHost: bigint("id_host", { mode: "number", unsigned: true })
      .notNull()
      .references(() => hosts.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.idDiscipline, table.idHost] }),
  }),
);

export const hostDisciplinesRelations = relations(hostDisciplines, ({ one, many }) => ({
  discipline: one(disciplines),
  host: one(hosts),
  event: many(events),
}));

export type HostDiscipline = typeof hostDisciplines.$inferSelect;
export type NewHostDiscipline = typeof hostDisciplines.$inferInsert;

export const insertHostDisciplineSchema = createInsertSchema(hostDisciplines);
export const selecthostDisciplineSchema = createSelectSchema(hostDisciplines);

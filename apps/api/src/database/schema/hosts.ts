import {
  mysqlTable,
  mysqlEnum,
  varchar,
  serial,
  smallint,
  bigint,
  datetime,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { countries } from "./countries.js";
import { athletes } from "./athletes.js";
import { hostDisciplines } from "./host_disciplines.js";

export const hosts = mysqlTable("hosts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 256 }).notNull(),
  startDate: datetime("start_date", { mode: "date" }),
  endDate: datetime("end_date", { mode: "date" }),
  name: varchar("name", { length: 256 }).notNull(),
  season: mysqlEnum("season", ["Summer", "Winter"]).notNull(),
  year: smallint("year").notNull(),
  location: bigint("location", { mode: "number", unsigned: true })
    .notNull()
    .references(() => countries.id),
});

export const hostsRelations = relations(hosts, ({ one, many }) => ({
  athlete: many(athletes),
  country: one(countries),
  host_discipline: many(hostDisciplines),
}));

export type Host = typeof hosts.$inferSelect;
export type NewHost = typeof hosts.$inferInsert;

export const insertHostSchema = createInsertSchema(hosts);
export const selectHostSchema = createSelectSchema(hosts);

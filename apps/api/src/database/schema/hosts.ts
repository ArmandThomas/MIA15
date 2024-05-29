import { mysqlTable,mysqlEnum ,varchar, serial, smallint, text, bigint, date } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { countries } from "./countries.js";
import {  athletes } from "./athletes.js";
import { host_disciplines } from "./host_disciplines.js";


export const hosts = mysqlTable("hosts", {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 256 }).notNull(),
    startDate: date("start_date"),
    endDate: date("end_date"),
    name: varchar("name", { length: 256 }).notNull(),
    season: mysqlEnum("season", ["Summer", "Winter"]).notNull(),
    year: smallint("year").notNull(),
    location: varchar("location", { length: 256 }).notNull() 
});
  

export const hostsRelations = relations(hosts, ({ one , many }) => ({
  athlete: many(athletes),
  country: one(countries),
  host_discipline: many(host_disciplines)

}));

export type Host = typeof hosts.$inferSelect;
export type NewHost = typeof hosts.$inferInsert;

// Schema for inserting a user - can be used to validate API requests
export const insertHostSchema = createInsertSchema(hosts);
// Schema for selecting a user - can be used to validate API responses
export const selectHostSchema = createSelectSchema(hosts);

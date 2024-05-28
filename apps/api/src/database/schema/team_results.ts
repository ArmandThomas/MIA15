import { mysqlTable,  bigint, primaryKey } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { countries } from "./countries.js";
import { results } from "./results.js";

export const team_results = mysqlTable("team_results", {
    idCountry: bigint("id_country", { mode: "number", unsigned: true })
        .notNull()
        .references(() => countries.id),

    idResult: bigint("id_result", { mode: "number", unsigned: true })
        .notNull()
        .references(() => results.id)
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.idCountry, table.idResult] })
    };
});

export const team_resultsRelations = relations(team_results, ({ one , many}) => ({
  result: one(results),
  country : one (countries),
  
}));

export type host_discipline = typeof team_results.$inferSelect;
export type NewHost_discipline = typeof team_results.$inferInsert;

// Schema for inserting a user - can be used to validate API requests
export const insertteam_resultschema = createInsertSchema(team_results);
// Schema for selecting a user - can be used to validate API responses
export const selectteam_resultschema = createSelectSchema(team_results);

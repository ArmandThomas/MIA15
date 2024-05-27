import type { Logger } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise.js";
import { env } from "@/env.js";

class QueryLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.debug("___QUERY___");
    console.debug(query);
    console.debug(params);
    console.debug("___END_QUERY___");
  }
}

const pool = mysql.createPool({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
});

export const db = drizzle(pool, { logger: new QueryLogger() });

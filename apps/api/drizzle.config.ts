import { defineConfig } from "drizzle-kit";
import { env } from "@/env.js";

export default defineConfig({
  schema: "src/database/schema/index.ts",
  out: "src/database/migrations",
  dialect: "mysql",
  dbCredentials: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  },
});

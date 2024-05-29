import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const Type = {
  STRING: z.string().min(1),
  NUMBER: z.coerce.number(),
  BOOLEAN: z.enum(["true", "false"]).transform((s) => s === "true"),
};

export const env = createEnv({
  server: {
    PORT: Type.NUMBER.int().positive().default(3000),
    DATABASE_HOST: Type.STRING.default("localhost"),
    DATABASE_PORT: Type.NUMBER.int().positive().default(3306),
    DATABASE_NAME: Type.STRING,
    DATABASE_USER: Type.STRING,
    DATABASE_PASSWORD: Type.STRING,
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
});

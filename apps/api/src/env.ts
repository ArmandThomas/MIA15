import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const Type = {
  STRING: z.string().min(1),
  NUMBER: z.coerce.number(),
  BOOLEAN: z.enum(["true", "false"]).transform((s) => s === "true"),
};

export const env = createEnv({
  server: {
    SERVER_HOST: Type.STRING.default("localhost"),
    SERVER_PORT: Type.NUMBER.int().positive().default(3000),
    // DATABASE_URL: Type.STRING.url(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
});

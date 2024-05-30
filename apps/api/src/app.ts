import express from "express";
import cors from "cors";
import { env } from "./env.js";

import greetingsRouter from "@/routes/greetings-router.js";
import countryRouter from "@/routes/country-router.js";
import athleteRouter from "@/routes/athlete-router.js";
import hostRouter from "@/routes/host-router.js";
import medalsRouter from "@/routes/medals-router.js";

export function createExpressApp(): express.Express {
  const app = express();

  expressConfigMiddleware(app);

  app.use("/greetings", greetingsRouter);
  app.use("/country", countryRouter);
  app.use("/athlete", athleteRouter);
  app.use("/hosts", hostRouter);
  app.use("/medals", medalsRouter);

  app.use(expressErrorHandlerMiddleware);

  return app;
}

function expressConfigMiddleware(app: express.Express): void {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use(cors({ origin: [env.WEB_URL] }));
  app.disable("x-powered-by");
}

function expressErrorHandlerMiddleware(
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
}

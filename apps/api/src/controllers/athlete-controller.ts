import { AthleteService } from "@/services/athlete-service.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { paginationSchema } from "@/utils/filters.js";
import type { RequestHandler } from "express";
import { z } from "zod";

const findAthlete: RequestHandler = async (req, res, next) => {
  const athleteId = z.coerce.number().safeParse(req.params.id);

  if (!athleteId.success) {
    res.status(400).json({ error: "Invalid request body" });
    return next();
  }

  const athlete = await AthleteService.findOne(athleteId.data);

  if (!athlete) {
    res.status(404).json({ error: "athlete not found" });
    return next();
  }

  res.json(athlete);
  next();
};

const findAllAthletes = asyncHandler(async (req, res, next) => {
  const filters = paginationSchema.safeParse(req.query);

  if (!filters.success) {
    res.status(400).json({ error: filters.error.flatten() });
    return next();
  }

  const athletes = await AthleteService.findAll(filters.data);

  res.status(200).json(athletes);
});

export const AthleteController = {
  findAthlete,
  findAllAthletes,
};

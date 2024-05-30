import { MedalService } from "@/services/medals-service.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { paginationSchema } from "@/utils/filters.js";
import { z } from "zod";

const findAllByAthlete = asyncHandler(async (req, res, next) => {
  const findAtheleteResultFilterSchema = paginationSchema.extend({
    country: z.string().optional(),
  });

  const filters = findAtheleteResultFilterSchema.safeParse(req.query);

  if (!filters.success) {
    res.status(400).json({ error: filters.error.flatten() });
    return next();
  }

  const athletes = await MedalService.findAllByAthlete(filters.data);

  res.status(200).json(athletes);
});

export const MedalsController = {
  findAllByAthlete,
};

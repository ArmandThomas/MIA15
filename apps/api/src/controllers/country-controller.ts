import type { RequestHandler } from "express";
import { CountryService } from "@/services/country-service.js";
import { z } from "zod";

const findCountry: RequestHandler = async (req, res, next) => {
  const countryId = z.coerce.number().safeParse(req.params.id);

  if (!countryId.success) {
    res.status(400).json({ error: "Invalid request body" });
    return next();
  }

  const country = await CountryService.findOne(countryId.data);

  if (!country) {
    res.status(404).json({ error: "Country not found" });
    return next();
  }

  res.json(country);
  next();
};

export const countryController = {
  findCountry,
};

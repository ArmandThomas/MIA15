import type { RequestHandler } from "express";
import { CountryService } from "@/services/country-service.js";
import { insertCountrySchema } from "@/database/schema/countries.js";

const createCountry: RequestHandler = async (req, res, next) => {
  const country = insertCountrySchema.safeParse(req.body);

  if (!country.success) {
    res.status(400).json({ error: "Invalid request body" });
    return next();
  }

  const createdCountry = await CountryService.create(country.data);
  res.json(createdCountry);
  next();
};

export const countryController = {
  createCountry,
};

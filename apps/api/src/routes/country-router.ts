import { Router } from "express";
import { countryController } from "@/controllers/country-controller.js";

const router = Router();

router.get("/:id", countryController.findCountry);

export default router;
